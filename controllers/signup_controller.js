import db from '../models/db.js';
import User from '../models/UserModel.js';
import bcrypt from 'bcrypt'; 
import passport from 'passport';
import upload from "../models/uploadMiddleware.js";

const signup_controller = {
    getCheckEmail: function (req, res) {
        db.findOne(User, {email: req.query.email}, null, (data) => {
            res.send(data);
        })
    },

    getCheckUsername: function (req, res) {
        db.findOne(User, {username: req.query.username}, null, (data) => {
            res.send(data);
        })
    },

    postLogout: function (req, res, next){
        req.logout((err) =>{
            if(err){
                return next(err);
            }
            res.redirect('/login');
        })
        
    },

    postLogin: function (req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    },

    postSignUp: function (req, res) {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        var user = {
            username: username,
            email: email,
            password: password,
        }
        console.log(user.username + ": username");
        
        bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) throw err;
                user.password = hash;
                console.log(user.password);

                db.insertOne (User, user, function (flag) {
                    if (flag) {
                        console.log("success")
                        res.redirect('/login');
                    }
                }); 
        }));

        //add to database
        
    },

    updateUser: function (req, res) {
        db.updateOne(User, {username: req.query.currN}, {username: req.query.newN, profileDesc: req.query.profDesc}, (data) =>{
            res.send(data);
        })
    },

    getCurrUsername: function(req, res){
        var currUser = req.user.username;
        console.log(currUser);
        res.send(currUser);
    },

    updatePicture: function(req, res){
        var username = req.user.username;
        upload(req, res, function(err){
            if (err){
                console.log(err);
                return res.end("Something went wrong.");
            }
            else{
                db.updateOne(User, {username: username}, {picture: req.file.filename}, function(data){
                    if(data)
                        res.redirect("/profile");
                })
            }
        })
    }
}

export default signup_controller;