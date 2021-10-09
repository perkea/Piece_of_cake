// Require dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const indexController= require("./controllers/index");
const usersController = require('./controllers/users');
const expressSession = require('express-session');


// Initialize Express App
const app = express();

// Configure App Settings
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (error) => console.log('MongoDB Error ' + error.message));

// Mount Middleware

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }))
app.use(expressSession({
    secret: 'cknlkclnclnen', // this is used to digitally sign our session cookies (prevents forgery)
    resave: false, // this option updates session storage after request
    saveUninitialized: false 
}));

app.use('/', usersController);
app.use('/', indexController);

// Mount Routes



// Tell the App to listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => { 
    console.log(`Express is listening on port:${PORT}`);
});