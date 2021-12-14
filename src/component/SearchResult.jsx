import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../css/Common.css";
import Navbar from './Navbar';
import axios from 'axios';

// All good
export default function SearchResult() {
    const [allJobs, setAllJobs] = useState([]);
    let { job } = useParams();

    function findAllJobs() {
        if(job){
            axios.get('http://localhost:8000/api/job/findJobByTitle/' + job)
            .then(response => {
                setAllJobs(response.data)
            })
            .catch(error => console.error(error));
        }
        else{
            axios.get('http://localhost:8000/api/job/findAll')
                .then(response => {
                    setAllJobs(response.data)
                })
                .catch(error => console.error(error));
        }
    }

    useEffect(findAllJobs, []);

    return (
        <div class='vertical'>
            <Navbar />
            <h2>Search results for: {job ? job : "All jobs"} ({allJobs.length} jobs found)</h2>
            <div>
                {allJobs.map(job => 
                    <Link to={{ pathname: `/jobDetail/${job._id}` }}>
                        <div class='box'>
                            <span style={{textDecoration: 'none', fontSize: 36, fontWeight: "bold"}}>{job.title}</span>
                            <span style={{textDecoration: 'none', fontSize: 18}}>{job.company}</span>
                            <span style={{textDecoration: 'none', fontSize: 18}}>{job.location}</span>

                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}