const { response } = require('express');
const express = require('express');
const auth_middleware = require('./auth_middleware');
const router = express.Router();
const JobAccessor = require('./models/Job.Model');
const { v4: uuid } = require('uuid');


router.get('/findAll', function (request, response) {
    // postman test passed
    // Return all posted jobs
    return JobAccessor.getAllJob()
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
})

router.get('/myPostedJobs', auth_middleware, function (request, response) {
    // not sure if this function will be used or not
    // return the jobs tht is posted by the signed in user
    return JobAccessor.findJobByUser(request.username)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
})

router.post('/', auth_middleware, function (request, response) {
    // postman test passed
    // create a job with the input fields
    // the creater of this job would be the current logged in user
    const job = request.body;
    if (!job.title || !job.company || !job.location || !job.description || !job.employerEmail) {
        return response.status(422)
            .send("Missing data! Job title, company, location, description and employer email can not be empty");
    }
    job.jobId = uuid();
    job.user = request.username;
    JobAccessor.insertJob(request.body)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))

})

router.delete('/:jobId', function (req, res) {
    // postman test passed
    // delete the selected job
    const jobIdToDelete = req.params.jobId;

    return JobAccessor.deleteJobByJobId(jobIdToDelete)
        .then(jobResponse => res.status(200).send(jobResponse))
        .catch(error => res.status(400).send(error))
})

router.put('/:jobId', function (req, res) {
    // update the selected job
    const jobIdToUpdate = req.params.jobId;
    return JobAccessor.updateJobByJobId(jobIdToUpdate, req.body)
        .then(jobResponse => res.status(200).send(jobResponse))
        .catch(error => res.status(400).send(error))
})

module.exports = router;