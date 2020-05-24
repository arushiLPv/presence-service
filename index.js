const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


   // var dbo = db.db("test");
    function getUsers(name) {
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect('mongodb+srv://arushi_v:56789@cluster0-qnhnp.mongodb.net/test?retryWrites=true&w=majority', function (err, db) {
            if (err) throw err;
            dbo.collection("loggedin").find({}).toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                // db.close();
            });
        });
          return name;
    };

    // Welcome Page
    router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

    // Dashboard
    router.get('/dashboard', ensureAuthenticated, (req, res) =>

        res.render('dashboard', {
            user: req.user,
            avatar: req.avatar,
            log: getUsers(req.user.name)
        })
    );

    module.exports = router;