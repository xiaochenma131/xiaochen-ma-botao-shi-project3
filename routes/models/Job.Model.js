const mongoose = require("mongoose");
const JobSchema = require('../schema/Job.Schema').JobSchema;

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
    return JobModel.create(job);
}

function deleteJobByJobId(jobId) {
    return JobModel.deleteOne({ jobId: jobId });
}

function findJobById(jobId) {
    return JobModel.findOneAndDelete({ jobId: jobId }).exec();
}

function findJobByTitle(title) {
    return JobModel.find({ title: title }).exec();
}

function findJobByUser(user) {
    return JobModel.find({
        user: user
    }).exec();
}

function getAllJob() {
    return JobModel.find().exec();
}

function updateJobByJobId(jobId, job) {
    return JobModel.findOneAndUpdate({ jobId: jobId }, job).exec();
}

module.exports = {
    insertJob,
    deleteJobByJobId,
    findJobById,
    findJobByTitle,
    findJobByUser,
    getAllJob,
    updateJobByJobId
};