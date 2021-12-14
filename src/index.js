import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './component/Home.jsx';
import LoginSignUp from './component/LogInSignUp.jsx';
import CreateJob from './component/CreateJob.jsx';
import EditJob from './component/EditJob.jsx';
import SearchJob from './component/SearchJob.jsx';
import SearchResult from './component/SearchResult.jsx'
import JobDetail from './component/JobDetail';

import Favorites from './component/Favorites.jsx';


// need change (favorites)
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loginsignup" element={<LoginSignUp />} />
      <Route path="/create" element={<CreateJob />} />
      <Route path="/edit/:jobId" element={<EditJob />}/>
      <Route path="/SearchJob" element={<SearchJob />}/>
      <Route path="/searchResult/" element={<SearchResult />} />
      <Route path="/searchResult/:job" element={<SearchResult />} />
      <Route path="/jobDetail/:jobId" element={<JobDetail />} />
      <Route path="/favorites/:userName" element={<Favorites />} />

    </Routes> 
  </Router>
  ,
  document.getElementById('root')
);
