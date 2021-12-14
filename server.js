const express = require('express');
const job = require('./routes/job.js');
const user = require('./routes/user.js');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');

// const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo');

//Setup MongoDB Connection
//const mongoString = 'mongodb://127.0.0.1/jobSearchApplication'
const mongoString = 'mongodb+srv://Xiaochen_Ma:Mxc96301@cluster0.zdupk.mongodb.net/jobSearchApplication?retryWrites=true&w=majority';
//process.env.MONGODB_URI || 'mongodb://127.0.0.1/jobSearchApplication';
//'mongodb+srv://Xiaochen_Ma:Mxc96301@cluster0.zdupk.mongodb.net/jobSearchApplication?retryWrites=true&w=majority'
mongoose.connect(mongoString, { useNewUrlParser: true })

const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const app = express();

app.use(session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongoString }),
}));

app.use(cors());

//nodapp.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/job', job);
app.use('/api/user', user);
// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes 

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(8000, () => {
    console.log('Starting server');
});