import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import Navbar from './Navbar';
import "../css/Common.css";
import axios from 'axios';
import dateFormat from "dateformat";

// All good
export default function JobDetail () {
    const [user, setUser] = useState();
    const [Job, setJob] = useState([]);
    const [favorite, setFavorite] = useState(0);
    const [buttonText, setButtonText] = useState('Favorite');
    const [created, setCreatedJob] = useState(false);

    let { jobId } = useParams();
    let navigate = useNavigate();

    function userLoggedIn() {
        axios.get('/api/user/userLoggedIn')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => console.error(error));
    }   
    useEffect(userLoggedIn, []);

    function findJob() {
        axios.get('http://localhost:8000/api/job/findJobById/' + jobId)
            .then(response => {
                setJob(response.data)
            })
            .catch(error => console.error(error));
    }

    useEffect(findJob, []);

    function favoriteJob(){
        if(favorite === 0){
            axios.post('/api/user/addFavorite/' + user + '/' + jobId)
            .then(response => {
                console.log(response);
            })
            .catch(error => console.error(error));
            setFavorite(1);
            setButtonText("Unfavorite");
        }
        else{
            axios.delete('/api/user/deleteFavorite/' + user + '/' + jobId)
            .then(response => {
                console.log(response);
            })
            .catch(error => console.error(error));
            setFavorite(0);
            setButtonText("Favorite");
        }
    }
    

    if(user){
        axios.get('/api/user/findAllFavorites/' + user)
            .then(response => {
                let favoriteJob = response.data.favorites;
                if(favoriteJob.includes(jobId)){
                    setFavorite(1);
                }
            })
            .catch(error => console.error(error));
        
        axios.get('/api/user/findAllCreated/' + user)
            .then(response => {
                let createdJob = response.data.created;
                if(createdJob.includes(jobId)){
                    setCreatedJob(true);
                }
            })
            .catch(error => console.error(error));
    }

    return (
        <div class='vertical'>
            <Navbar />
            <grid-container>
                <box1>
                    <grid-item>
                        <h2>Job Title:</h2>
                    </grid-item>
                </box1>
                <box2>
                    <grid-item>
                        <h2>{Job.title}</h2>
                    </grid-item>
                </box2>
                <box3>
                    <grid-item>
                        <h2>Company:</h2>
                    </grid-item>
                </box3>
                <box4>
                    <grid-item>
                        <h2>{Job.company}</h2>
                    </grid-item>
                </box4>
                <box5>
                    <grid-item>
                        <h2>Location:</h2>
                    </grid-item>
                </box5>
                <box6>
                    <grid-item>
                        <h2>{Job.location}</h2>
                    </grid-item>
                </box6>
                <box7>
                    <grid-item>
                        <h2>Job Description:</h2>
                    </grid-item>
                </box7>
                <box8>
                    <grid-item>
                        <h2>{Job.description}</h2>
                    </grid-item>
                </box8>
                <box9>
                    <grid-item>
                        <h2>Contact Email:</h2>
                    </grid-item>
                </box9>
                <box10>
                    <grid-item>
                        <h2>{Job.email}</h2>
                    </grid-item>
                </box10>
                <box11>
                    <grid-item>
                        <h2>Company Website: (Optional)</h2>
                    </grid-item>
                </box11>
                <box12>
                    <grid-item>
                        <h2>{Job.website}</h2>
                    </grid-item>
                </box12>
                <box13>
                    <grid-item>
                        <h2>Posting Date:</h2>
                    </grid-item>
                </box13>
                <box14>
                    <grid-item>
                        <h2>{dateFormat(Job.date, "yyyy-mm-dd")}</h2>
                    </grid-item>
                </box14>

            </grid-container>
            {!created &&
                <div class='horizontal'>
                <button class='button' onClick={() => { 
                    if (user) {
                        favoriteJob();
                    }
                    else {
                        navigate("/loginsignup"); 
                    }
                    }}>{buttonText}</button>
                </div>
            }
            {created &&
                <div class='horizontal'>
                    <button class='button' onClick={() => {
                            favoriteJob()
                        }}>{buttonText}</button>
                    <button class='button' onClick={() => navigate("/edit/" + jobId)}>Edit</button>
                    <button class='button' onClick={() => {
                        axios.delete('/api/job/delete/' + jobId)
                            .then(response => {
                                console.log(response);
                                navigate(-1);
                            })
                            .catch(error => console.error(error));
                    }}>Delete</button>
                </div>
            }
        </div>
    )
}