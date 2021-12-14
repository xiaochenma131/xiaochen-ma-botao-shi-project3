const mongoose = require("mongoose")
const UserSchema = require('../schema/User.Schema').UserSchema

const UserModel = mongoose.model("User", UserSchema);

function insertUser(user) {
    return UserModel.create(user);
}

function findUserByUsername(username) {
    return UserModel.findOne({ username: username }).exec();
}

function findAllFavorites(username) {
    return UserModel.findOne({ username: username }, 'favorites').exec();
}

function findAllCreated(username) {
    return UserModel.findOne({ username: username }, 'created').exec();
}

function addFavorite(username, jobId) {
    return UserModel.findOneAndUpdate({ username: username }, { $addToSet: { favorites: jobId } });
}

function deleteFavorite(username, jobId) {
    return UserModel.findOneAndUpdate({ username: username }, { $pull: { favorites: jobId } });
}

function insertCreatedJobOfUser(username, jobId) {
    return UserModel.findOneAndUpdate({ username: username }, { $addToSet: { created: jobId } });
}

module.exports = {
    insertUser,
    findUserByUsername,
    findAllFavorites,
    findAllCreated,
    addFavorite,
    deleteFavorite,
    insertCreatedJobOfUser,
};