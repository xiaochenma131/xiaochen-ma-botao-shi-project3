import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Navbar from './Navbar';
import "../css/Common.css";
import axios from 'axios';

// All good
export default function EditJob () {
    const [user, setUser] = useState();
    const [job, setJob] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        email: '',
        website: '',
    });

    let navigate = useNavigate();
    let { jobId } = useParams();

    function getJobInfo(){
        axios.get('/api/job/findJobById/' + jobId)
            .then(response => {
                setJob({
                    title: response.data.title,
                    company: response.data.company,
                    location: response.data.location,
                    description: response.data.description,
                    email: response.data.email,
                    website: response.data.website,
                })
            })
            .catch(error => console.log(error))
    }

    useEffect(getJobInfo, [])

    function userLoggedIn() {
        axios.get('/api/user/userLoggedIn')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => console.error(error));
    }
    useEffect(userLoggedIn, []);

    return (
        <div class='vertical'>
            <Navbar/>
            <grid-container>
                <box1>
                    <grid-item>
                        <h2>Job Title:</h2>
                    </grid-item>
                </box1>
                <box2>
                    <grid-item>
                        <input value={job.title} onChange={(e) => {
                            const title = e.target.value;
                            setJob({
                                ...job,
                                title: title
                            })
                        }}/>
                    </grid-item>
                </box2>
                <box3>
                    <grid-item>
                        <h2>Company:</h2>
                    </grid-item>
                </box3>
                <box4>
                    <grid-item>
                        <input value={job.company} onChange={(e) => {
                            const company = e.target.value;
                            setJob({
                                ...job,
                                company: company
                            })
                        }}/>  
                    </grid-item>
                </box4>
                <box5>
                    <grid-item>
                        <h2>Location:</h2>
                    </grid-item>
                </box5>
                <box6>
                    <grid-item>
                        <input value={job.location} onChange={(e) => {
                            const location = e.target.value;
                            setJob({
                                ...job,
                                location: location
                            })
                        }}/>
                    </grid-item>
                </box6>
                <box7>
                    <grid-item>
                        <h2>Job Description:</h2>
                    </grid-item>
                </box7>
                <box8>
                    <grid-item>
                        <textarea value={job.description} onChange={(e) => {
                            const description = e.target.value;
                            setJob({
                                ...job,
                                description: description
                            })
                        }}/>
                    </grid-item>
                </box8>
                <box9>
                    <grid-item>
                        <h2>Contact Email:</h2>
                    </grid-item>
                </box9>
                <box10>
                    <grid-item>
                        <input type='email' value={job.email} onChange={(e) => {
                            const email = e.target.value;
                            setJob({
                                ...job,
                                email: email
                            })
                        }}/>
                    </grid-item>
                </box10>
                <box11>
                    <grid-item>
                        <h2>Company Website: (Optional)</h2>
                    </grid-item>
                </box11>
                <box12>
                    <grid-item>
                    <input value={job.website} onChange={(e) => {
                        const website = e.target.value;
                        setJob({
                            ...job,
                            website: website
                        })
                    }}/>
                    </grid-item>
                </box12>

            </grid-container>

        <button class = 'button' onClick={() => {
            axios.put('/api/job/update/' + jobId, job)
            .then(updatedJobResponse => {
                console.log(updatedJobResponse);
                navigate("/jobDetail/" + jobId);
            })
            .catch(error => {
                console.error(error)
                alert("All information (except for company website) are required!");
            });
            
        }}>Save Change</button>
    </div>

    )
}