const { response } = require('express');
const express = require('express');
const router = express.Router();
const JobAccessor = require('./models/Job.Model');

// find all jobs in database
router.get('/findAll', function (req, res) {
    return JobAccessor.getAllJobs()
        .then(jobResponse => res.status(200).send(jobResponse))
        .catch(error => res.status(400).send(error))
})


// search a job with title
router.get('/findJobByTitle/:jobTitle', function (req, res) {
    return JobAccessor.findJobByTitle(req.params.jobTitle)
        .then(jobResponse => res.status(200).send(jobResponse))
        .catch(error => res.status(400).send(error))
})

// search a job with jobId
router.get('/findJobById/:jobId', function (req, res) {
    return JobAccessor.getJobById(req.params.jobId)
        .then(jobResponse => res.status(200).send(jobResponse))
        .catch(error => res.status(400).send(error))
})

// create a new job
router.post('/', function (req, res) {
    const { title, company, location, description, email } = req.body;
    if (!title || !company || !location || !description || !email) {
        return res.status(422).send("Required information is missing");
    }
    return JobAccessor.insertJob(req.body)
        .then(jobResponse => res.status(200).send(jobResponse))
        .catch(error => res.status(400).send(error))
})

// update a job
router.put('/update/:jobId', function (req, res) {
    return JobAccessor.updateJobById(req.params.jobId, req.body)
        .then(jobResponse => res.status(200).send(jobResponse))
        .catch(error => res.status(400).send(error))
})

// delete a job
router.delete('/delete/:jobId', function (req, res) {
    return JobAccessor.deleteJobByJobId(req.params.jobId)
        .then(jobResponse => res.status(200).send(jobResponse))
        .catch(error => res.status(400).send(error))
})

// This api is just for Favorites, again, we have no idea why this is needed but this is required to make Favorites.jsx work...
router.post('/findAllJobsByIds', function (req, res) {
    return JobAccessor.getAllJobsByIds(req.body._id)
        .then(jobResponse => res.status(200).send(jobResponse))
        .catch(error => res.status(400).send(error))
})

// We try to use middleware to record past steps in the following APIs, but they failed :(
// router.get('/myPostedJobs', auth_middleware, function (request, response) {
//     // not sure if this function will be used or not
//     // return the jobs tht is posted by the signed in user
//     return JobAccessor.findJobByUser(request.username)
//         .then(jobResponse => response.status(200).send(jobResponse))
//         .catch(error => response.status(400).send(error))
// })

// router.post('/', auth_middleware, function (request, response) {
//     // postman test passed
//     // create a job with the input fields
//     // the creater of this job would be the current logged in user
//     const job = request.body;
//     if (!job.title || !job.company || !job.location || !job.description || !job.employerEmail) {
//         return response.status(422)
//             .send("Missing data! Job title, company, location, description and employer email can not be empty");
//     }
//     job.jobId = uuid();
//     job.user = request.username;
//     JobAccessor.insertJob(request.body)
//         .then(jobResponse => response.status(200).send(jobResponse))
//         .catch(error => response.status(400).send(error))

// })


module.exports = router; 