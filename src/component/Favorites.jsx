import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import "../css/Common.css";
import axios from 'axios';

// Sorry this part is far beyond our capacity, we referenced from https://piazza.com/class/ktayt384zomhi?cid=332
// Dilraj and Siyan Ma from our class are the original author to this part, we try to write our own version but we honestly don't know how to do that :(
export default function Favorites() {
    let { userName } = useParams();

    const [favorites, setFavoriteJobs] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    
    const getAllFavoriteIds = () => {
      return axios.get('/api/user/findAllFavorites/' + userName)
        .then(response => {
          const favorites = response.data.favorites;
          setFavoriteJobs(favorites);
          return favorites;
        })
        .catch(error => console.error(error));
    };
    
    const getAllJobsByIds = (favs) => {
      return axios.post('/api/job/findAllJobsByIds', { _id: favs })
        .then(response => setAllJobs(response.data))
        .catch(error => console.log(error));
    };
    
    const getAllData = () => {
      return getAllFavoriteIds()
        .then(favs => getAllJobsByIds(favs));
    };
    
    useEffect(() => {
      getAllData().then(() => {
        console.log(favorites);
        console.log(allJobs);
      });
    }, []);

    return (
        <div class='vertical'>
            <Navbar />
            <h2>Favorited Jobs: ({allJobs.length} jobs found)</h2>
            {allJobs.map(job =>
                <Link class="link" to={{ pathname: `/jobDetail/${job._id}` }}>
                    <div class='box'>
                        <span style={{textDecoration: 'none', fontSize: 36, fontWeight: "bold"}}>{job.title}</span>
                        <span style={{textDecoration: 'none', fontSize: 18}}>{job.company}</span>
                        <span style={{textDecoration: 'none', fontSize: 18}}>{job.location}</span>

                    </div>
                </Link>
            )}

        </div>
    )
}