const express = require('express');
const router = express.Router();
module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/users/login');
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        router.get('/dashboard', function (req, res) {
            var query = { loggedin: true };

            User.find(query).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);

            });
       });
       // res.redirect('/dashboard');
    }
};