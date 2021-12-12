const express = require('express');
const router = express.Router();
const UserModel = require('./models/User.Model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./auth_middleware.js');
const { model } = require('mongoose');


router.get('/findAll', function (request, response) {
    // postman test passed
    // Returns all signed up users in the database
    UserModel.getAllUsers()
        .then((userResponse) => {
            response.status(200).send(userResponse)
        })
        .catch(error => response.statusCode(400).send(error))
})

router.get('/whoIsLoggedIn', auth_middleware, function (request, response) {
    // postman test passed
    // Returns the username of the user that is currently signed in
    const username = request.session.username;

    return response.send(username);
})

router.get('/authenticate', function (request, response) {
    // postman test passed
    // This function helps us realize the sign in functionality
    // It will check if the username and password provided in the request
    // can match any user in out database. If we find one that match the 
    // input, we will also set up the session which stores the username
    // of the signed in user
    let { username, password } = request.body;
    if (!username || !password) {
        return response.status(422).send('Must include both password and username');
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                return response.status(404).send("No user found with that username");
            }
            if (userResponse.password === password) {
                request.session.username = username;
                return response.status(200).send({ username });
            } else {
                return response.status(404).send("No user found with that password");
            }
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));
})

//router.get('/:username', (request, response) => {
// postman test passed
//    const username = request.params.username;
//    if (!username) {
//        return response.status(422).send("Missing data");
//    }

//   return UserModel.findUserByUsername(username)
//        .then((userResponse) => {
//            if (!userResponse) {
//                response.status(404).send("User not found");
//            }

//            response.send(userResponse);
//        })
//        .catch((error) => response.status(500).send("Issue getting user"))
//})

router.post('/', function (req, res) {
    // postman test passed
    // This function helps us realize the sign up functionality
    // If the required fields are all providied, it will create and 
    // insert a user into out database and set up the session with username
    // how to do password verification?
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(422).send("Missing username: " + username + "or password:" + password)
    }

    UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (userResponse) {
                return res.status(422).send("Username already exist!");
            }
        })

    return UserModel.insertUser({ username: username, password: password })
        .then((userResponse) => {
            req.session.username = username;
            return res.status(200).send(userResponse);
        })
        .catch(error => res.status(422).send(error))
});

router.post('/logout', function (req, res) {
    // postman test passed
    // This will log the signed in user out and destroy the session
    req.session.destroy();
    return res.send("Ok");
})

router.post('/favorite/:jobId', auth_middleware, function (req, res) {
    //postman test passed
    // add jobId to this user's favorite list
    // 目前还只是记录jobId在favorites中， 我还在考虑要不要直接store job object
    // Still working on this part
    const username = req.session.username;
    const jobId = req.params.jobId;
    return UserModel.findUserByUsernameAndUpdateFavorite(username, jobId)
        .then((userResponse) => {
            return res.status(200).send(userResponse.favorites)
        })
        .catch(error => res.status(422).send(error))
});

router.get('/favorite', auth_middleware, function (req, res) {
    // postman test passed
    // get a list of jobId which are favorited by the current user
    // still working on this part
    const username = req.session.username;
    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            return res.status(200).send(userResponse.favorites);
        })
        .catch(error => res.status(422).send(error))
});

// one more function to do : router.delete('/favorite/:jobId')
module.exports = router;