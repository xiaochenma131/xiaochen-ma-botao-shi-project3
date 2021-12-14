const mongoose = require("mongoose")
const JobSchema = require('../schema/Job.Schema').JobSchema

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
    return JobModel.create(job);
}

function getAllJobs() {
    return JobModel.find().exec();
}

function findJobByTitle(title) {
    return JobModel.find({ title: { $regex: title, $options: 'i' } }).exec();
}

function getJobById(id) {
    return JobModel.findById(id).exec();
}

function deleteJobByJobId(jobId) {
    return JobModel.deleteOne({ jobId: jobId });
}

function updateJobById(id, job) {
    return JobModel.findByIdAndUpdate(id, job);
}

// This api is just for Favorites, again, we have no idea why this is needed but this is required to make Favorites.jsx work...
function getAllJobsByIds(idArray) {
    return JobModel.find({ '_id': { $in: idArray } }).exec();
}

module.exports = {
    getAllJobs,
    findJobByTitle,
    getJobById,
    insertJob,
    updateJobById,
    deleteJobByJobId,
    getAllJobsByIds,
};