const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const username = req.session.username;
    if (!username) {
        res.status(401).send('Please log in first!');
    } else {
        req.username = username;
        next();
    }
}