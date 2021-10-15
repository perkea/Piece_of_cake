const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Recipe = require("../models/recipe");
const isAuthenticated = require("../utils/auth");
/*
1) Stub up a basic project boilerplate
2) Install the bcrypt library
3) Define the authentication workflow
   3.1) Define a signup route/controller to send the user to a registration form
   3.2) Allow the user to fill out the form and submit it
   3.3) Use bcrypt to hash the user plain text password from req.body
   3.4) Save the user data to the data along with the hashed version of their password
   3.5) Redirect the user to the login page and make them login or auto log them in and send them to a dashboard
To Login
1) Send the user to a login page
2) User fills out form with login credentials
3) User submits the form as a POST request to the server
    3.1) First, we check to see if the user exists in the database by finding the user by their username
    3.2) If the user does not exist, we need to let them know - "Invalid Credentials"
    3.3) If the user is found, we need to compare the plain text password submitted in the form to the
         hashed password
    4.3) If the password is not a match, we need to let the user know - "Invalid Credentials"
    4.4) If the password is correct we create a session on the server 
         by storing the users ObjectId in session storage
To Logout
1) User clicks a logout button
2) We receive that request on the server side
3) req.session.destroy()
*/
router.get("/delete", async (req, res) => {
    await User.deleteMany({});
    res.redirect("/");
});
////////////////////// present user with login page////////////////////
router.get('/login', (req, res) => {
    res.render('login.ejs', {
        error: " "
    });
});
////////////////////////// handle form submission to login/////////////////
router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, foundUser) => {
        if (!foundUser) {
            return res.render('login.ejs', {
                error: 'Invalid Credentials'
            });
        }

        console.log('login', err, foundUser, foundUser.password, req.body.password)

        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password);
        console.log(isMatched)
        if (!isMatched) {
            return res.render('login.ejs', {
                error: 'Invalid Credentials'
            });
        }

        req.session.user = foundUser._id;

        res.redirect('/recipes')
    });
});
//////////////////////////////// present user with signup page///////////////
router.get("/signup", (req, res) => {
    res.render('signup.ejs');
});

router.post('/signup', (req, res) => {
    // 0) Perform a db lookup to determine if username exist 
    // 1) Hash the password
    console.log('signup body', req.body)
    const tempPassword = req.body.password;
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    const isMatched = bcrypt.compareSync(tempPassword, req.body.password);
    console.log('password check', tempPassword, req.body.password, isMatched)

    // test password matching?


    //hash the passsword
    //gensalt generates  random string of password
    //Save the userdata to the data base with the hash version of the password
    User.create(req.body, (error, user) => {
        req.session.user = user._id
        console.log(user)
        res.redirect('/login');
    })

});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

//Protected route
router.get("/login", isAuthenticated, (req, res) => {
    User.findById(req.session.user, (err, user) => {
        Recipe.find({
            user: user._id
        }, (err, recipes) => {
            res.render("login.ejs"), {
                user,
                recipes
            };
        })
    })
});


router.get("/", (req, res) => {
   res.redirect("/login")
});



module.exports = router;