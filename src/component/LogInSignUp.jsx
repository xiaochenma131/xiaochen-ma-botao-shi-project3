import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import "../css/Common.css";
import Navbar from './Navbar';
import axios from 'axios';

// All good
export default function LoginSignUp() {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    })

    let navigate = useNavigate();

    return (
        <div class="vertical">
            <Navbar />
            <grid-container>
                <box1>
                    <grid-item>
                        <h2>Username:</h2>
                    </grid-item>
                </box1>
                <box2>
                    <grid-item>
                        <input value={userData.username} onChange={(e) => {
                            const username = e.target.value;
                            setUserData({
                                ...userData,
                                username: username
                        })
                    }} />
                    </grid-item>
                </box2>
                <box3>
                    <grid-item>
                        <h2>Password:</h2>
                    </grid-item>
                </box3>
                <box4>
                    <grid-item>
                        <input value={userData.password} onChange={(e) => {
                            const password = e.target.value;
                            setUserData({
                                ...userData,
                                password: password
                        })
                    }} />
                    </grid-item>
                </box4>
            </grid-container>

            <div class='horizontal'>
                <button class='button' onClick={() => {
                    axios.post('/api/user/authenticate', userData)
                        .then(response => {
                            console.log(response);
                            navigate(-1);
                        })
                        .catch(error => {
                            console.log(error);
                            alert("Invalid Username or Password!");
                        });
                    }} >Log In</button>

                <button class='button' onClick={() => {
                    axios.post('/api/user/', userData)
                        .then(response => {
                            console.log(response);
                            axios.post('/api/user/authenticate', userData)
                                .then(response => {
                                    console.log(response);
                                    navigate(-1);
                                })
                                .catch(error => {
                                    console.log(error);
                                    alert("Invalid Username or Password!");
                                });
                            })
                        .catch(error => {
                            console.log(error);
                            alert("Username is not available!");
                        });
                    }} >Sign Up</button>
            </div>

        </div>
    );
}