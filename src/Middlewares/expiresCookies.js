module.exports = async (req,res,next) => {
    if(req.body.remember) {
        req.session.cookie.expires = new Date(Date.now() + 36000000);
    }
    next();
}