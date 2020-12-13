
const express = require('express');
const app = express();

// Logging all requests
app.use(function (req, res, next) {
    console.log(`${new Date()} - ${req.method} requests for ${req.url}`);
    next();
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


// Servin
// Serving Static Folder
app.use(express.static('static'))


module.exports = app;