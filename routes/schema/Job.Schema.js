const Schema = require('mongoose').Schema;

exports.JobSchema = new Schema({
    jobId: String,
    tilte: String,
    company: String,
    location: String,
    description: String,
    employerEmail: String,
    link: String,
    postingDate: {
        type: Date,
        default: Date.now
    },
    user: String, // the username that created this job
}, { collection: 'jobs' });