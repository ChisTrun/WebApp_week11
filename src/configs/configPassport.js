const passport = require('passport');
const MyStrategy = require('../ultis/customSPP')
const User = require('../models/acc.m')
const JwtStrategy = require('passport-jwt').Strategy;
const OAuth2Strategy = require('passport-oauth2').Strategy;
const bcrypt = require('bcrypt');
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.username);
});
passport.deserializeUser(async (username, done) => {
    const user = await User.findUser(username);
    if (user == undefined) {
        done('auth err!');
        return;
    }
    done(null, user)
});

const configPassport = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new MyStrategy(async (un, pw, done) => {
        const rs = await User.findUser(un);
        let auth = false;
        if (rs != undefined) {
            auth = await bcrypt.compareSync(pw, rs.password);
        }
        if (auth) {
            done(null, rs);
        } else {
            done('invalid auth');
        }
    }, {}))
    const cookieExtractor = function(req) {
        var token = null;
        if (req && req.session.jwt ) {
            token = req.session.jwt;
        }
        return token;
    };

    passport.use(new JwtStrategy({
        secretOrKey: process.env.SECRET_KEY_JWT,
        jwtFromRequest: cookieExtractor
    }, async (token,done) => {
        return done(null,token.user);
    }))
   
}

module.exports = configPassport;