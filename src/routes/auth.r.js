const express = require('express');
const logIn = require('../Middlewares/login');
const createAndStoreJWT = require('../Middlewares/createAndStoreJWT');
const accController = require('../controllers/acc.c');
const authenticate = require('../Middlewares/authenticate');
const expiresCookies = require('../Middlewares/expiresCookies')
const router = express.Router();
const passport = require('passport');

router.get('/login/:success?',accController.getLogin);
router.get('/signup/:success?',accController.getSignup);
router.post('/signup',accController.postSignup);
router.post('/logout',accController.postLogout);
router.post('/login',authenticate,logIn,createAndStoreJWT,expiresCookies,(req,res) => {
    if(req.user.permission == 1) {
        res.redirect('/admin')
    } else if(req.user.permission == 2) {
        res.redirect('/customer')
    }

});

module.exports = router;