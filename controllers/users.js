const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Recipe = require("../models/recipe");
const isAuthenticated = require("../utils/auth");



router.get("/delete", async (req, res) => {
    await User.deleteMany({});
    res.redirect("/");
});
////////////////////// present user with login page///////////////////////////////////////////////
router.get('/login', (req, res) => {
    res.render('login.ejs', {
        error: " "
    });
});
////////////////////////// handle form submission to login//////////////////////////////////////////
router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, foundUser) => {
        if (!foundUser) {
            return res.render('login.ejs', {
                error: 'Invalid Credentials'
            });
        }
        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password);
        if (!isMatched) {
            return res.render('login.ejs', {
                error: 'Invalid Credentials'
            });
        }
        req.session.user = foundUser._id;
        res.redirect('/recipes')
    });
});
//////////////////////////////// present user with signup page//////////////////////////////////
router.get("/signup", (req, res) => {
    res.render('signup.ejs');
});

router.post('/signup', (req, res) => {
    const tempPassword = req.body.password;
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    const isMatched = bcrypt.compareSync(tempPassword, req.body.password)
    User.create(req.body, (error, user) => {
        req.session.user = user._id
        res.redirect('/login');
    })

});
////////////////////////////////////////logout/////////////////////////////////////////////////////
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

//////////////////////////////////////////Protected route/////////////////////////////////////////
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