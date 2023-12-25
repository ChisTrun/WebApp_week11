const User = require('../models/acc.m');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

module.exports = {
    getLogin: async (req, res, next) => {
        try {
            let success = true;
            if (req.params.success) success = JSON.parse(req.params.success);
            res.render('login', {host: process.env.HOST,port: process.env.PORT ,success: success });
        } catch (error) {
            next(error);
        };
    },

    getSignup: async (req, res, next) => {
        try {
            let success = true;
            if (req.params.success) success = JSON.parse(req.params.success);
            res.render('signup', {host: process.env.HOST,port: process.env.PORT, success: success });
        } catch (error) {
            next(error);
        };

    },

    postSignup: async (req, res, next) => {
        try {
            let addRs = false;
            let signUpData = req.body;
            let checkUser = await User.findUser(signUpData.username);
            signUpData.permission =  signUpData.admin == 'true'? 1 : 2;
            if (checkUser == undefined) {
                await bcrypt.hash(signUpData.password, saltRounds).then(function (hash) {
                    console.log(hash)
                    console.log(typeof hash)
                    signUpData.password = hash;
                });
                console.log(signUpData);
                addRs = await User.addUser(signUpData);
                res.redirect('/login');
            } else {
                res.redirect('/signup/false');
            }
        } catch (error) {
            next(error);
        };
    },

    postLogout: async (req,res,next) => {
        try {
            req.session.destroy();
            req.logOut;
            res.redirect('/login');
        } catch(error) {
            next(error);
        }
    }

}