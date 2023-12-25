const passport = require('passport');

const auth = (req,res,next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        const err = new Error("You must login before access this page!");
        next(err);
    }
}

module.exports = auth