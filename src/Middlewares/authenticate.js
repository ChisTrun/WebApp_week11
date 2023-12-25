const passport = require('passport');

module.exports = passport.authenticate('MyStrategy',{ failureRedirect: '/login/false' })