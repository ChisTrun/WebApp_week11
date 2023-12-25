const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req,res,next) => {
    const token = jwt.sign({ user: req.user }, process.env.SECRET_KEY_JWT);
    req.session.jwt = token;
    next();
}