const express = require('express');
const router = express.Router();
const UserAccessor = require('./models/User.Model');
const auth_middleware = require('./auth_middleware.js')

// find users with username
router.get('/findUserByUsername/:username', function (req, res) {
    return UserAccessor.findUserByUsername(req.params.username)
        .then(userResponse => res.status(200).send(userResponse))
        .catch(error => res.status(400).send(error))
})

// create a new user
router.post('/', function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(422).send("Either username or password is missing");
    }
    UserAccessor.findUserByUsername(req.body["username"])
        .then(userResponse => {
            if (userResponse) {
                res.status(402).send("Username is not available")
            } else {
                return UserAccessor.insertUser(req.body)
                    .then(userResponse => res.status(200).send(userResponse))
                    .catch(error => res.status(400).send(error))
            }
        })
})

// find all favorites of a user
router.get('/findAllFavorites/:username', function (req, res) {
    return UserAccessor.findAllFavorites(req.params.username)
        .then(userResponse => res.status(200).send(userResponse))
        .catch(error => res.status(400).send(error))
})

// add a job in favorites
router.post('/addFavorite/:username/:jobId', function (req, res) {
    return UserAccessor.addFavorite(req.params.username, req.params.jobId)
        .then(userResponse => res.status(200).send(userResponse))
        .catch(error => res.status(400).send(error))
})

// delete a job from favorites
router.delete('/deleteFavorite/:username/:jobId', function (req, res) {
    return UserAccessor.deleteFavorite(req.params.username, req.params.jobId)
        .then(userResponse => res.status(200).send(userResponse))
        .catch(error => res.status(400).send(error))
})

// find all jobs created by the user
router.get('/findAllCreated/:username', function (req, res) {
    return UserAccessor.findAllCreated(req.params.username)
        .then(userResponse => res.status(200).send(userResponse))
        .catch(error => res.status(400).send(error))
})

// add a job to the created job list of a user
router.post('/addCreated/:username/:jobId', function (req, res) {
    return UserAccessor.insertCreatedJobOfUser(req.params.username, req.params.jobId)
        .then(userResponse => res.status(200).send(userResponse))
        .catch(error => res.status(400).send(error))
})

// check username and password
router.post('/authenticate', function (req, res) {
    let { username, password } = req.body;
    if (!username || !password) {
        return res.status(422).send('Either username or password is missing');
    }

    return UserAccessor.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                return res.status(404).send("Username not found");
            }
            if (userResponse.password === password) {
                req.session.username = username;
                return res.status(200).send({ username });
            } else {
                return res.status(404).send("Password is not correct");
            }
        })
        .catch((error) => console.error(error));
})

// record the user logged in
router.get('/userLoggedIn', auth_middleware, function (req, res) {
    const username = req.session.username;
    return res.send(username);
})

// logout
router.delete('/logout', function (req, res) {
    req.session.destroy();
    return res.status(200).send(req.session);
})

// We try to use middleware to record past steps in the following APIs, but they failed :(
//  router.post('/favorite/:jobId', auth_middleware, function (req, res) {
//     //postman test passed
//     // add jobId to this user's favorite list
//     const username = req.session.username;
//     const jobId = req.params.jobId;
//     return UserModel.findUserByUsernameAndUpdateFavorite(username, jobId)
//         .then((userResponse) => {
//             return res.status(200).send(userResponse)
//         })
//         .catch(error => res.status(422).send(error))
// });

// router.get('/favorite', auth_middleware, function (req, res) {
//     // postman test passed
//     // get a list of jobId which are favorited by the current user
//     const username = req.session.username;
//     return UserModel.findUserByUsername(username)
//         .then((userResponse) => {
//             return res.status(200).send(userResponse.favorites);
//         })
//         .catch(error => res.status(422).send(error))
// });

// router.delete('/favorite/:jobId', auth_middleware, function (req, res) {
//     // postman test passed
//     // delete the jobId from the favorite list of the current user
//     const username = req.session.username;
//     const jobId = req.params.jobId;
//     return UserModel.findUserByUsernameAndDeleteFavorite(username, jobId)
//         .then((userResponse) => {
//             return res.status(200).send(userResponse)
//         })
//         .catch(error => res.status(422).send(error))
// });

module.exports = router;