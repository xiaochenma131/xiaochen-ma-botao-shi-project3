const Schema = require('mongoose').Schema;

exports.UserSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    favorites: {
        type: Array,
    }
}, {
    collection: 'users'
})