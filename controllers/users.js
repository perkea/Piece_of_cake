const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");


router.get("/delete", async (res, req) => {
    await User.deleteMany({});
    res.redirect("/");
});

router.get('/login', (req, res) => {
    res.render('login.ejs', {
        error: " "
    });
});
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

        res.redirect('dashboard.ejs')
    });
});



router.get("/signup", (req, res) => {
    res.render('signup.ejs');
});

router.post('/signup', (req, res) => {
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
        res.redirect('dashboard.ejs');
    })

});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

function isAuthenticated(req, res, next) {
    if (!req.session.user) { // user is not logged in
        return res.redirect('login');
    }
    next(); // user is authenticated, keep moving on to the next step
}

module.exports = router;