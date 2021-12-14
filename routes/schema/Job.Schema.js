const Schema = require('mongoose').Schema;

exports.JobSchema = new Schema({
    title: String,
    company: String,
    location: String,
    description: String,
    email: String,
    website: String,
    date: {
        type: Date,
        default: Date.now,
    },
    // this explicitly declares what collection we're using
}, { collection: 'jobs' });