const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

const LoggedIn = require('../models/Loggedin');

// Login Page      
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email }).then(user => {
            console.log('hhhhh');
            if (user) {
                console.log('hello1');


                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
               // MongoClient.connect(url, function (err, db) {
                   // if (err) throw err;
                // var dbo = db.db("mydb");
                console.log('hello');
       /*         MongoClient.connect('mongodb+srv://arushi_v:56789@cluster0-qnhnp.mongodb.net/test?retryWrites=true&w=majority' , function (err, db) {
                    if (err) throw err;
                  var dbo = db.db("test");
                      dbo.collection("loggedin").find({}).toArray(function (err, result) {
                        if (err) throw err;
                        console.log(result);
                        db.close();
                    });
                });
                */
              //  LogScheme.find({}).toArray(function (err, result) {
                //        if (err) throw err;
                  //      console.log(result);
                       // db.close();
                 //   });
               
                const newUser = new User({
                    name,
                    email,
                    password
                    
                    
                   
                });
          //      var jsontext = {
            //        "firstName": name,
              //  };
                //var obj = JSON.parse(text);



                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/users/login');

                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// Login

router.post('/login', (req, res, next) => {
    console.log('hello55');
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb+srv://arushi_v:56789@cluster0-qnhnp.mongodb.net/test?retryWrites=true&w=majority', function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("loggedin").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
    passport.authenticate('local', {

        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});
var ob = {
    table: []
};
// Logout
router.get('/logout', (req, res) => {
    req.logout();
    var myquery = { loggedin: true };
    var newvalues = { $set: { loggedin: false } };
    User.updateMany(myquery, newvalues, function (err, res) {
        if (err) throw err;
        
    });



    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;