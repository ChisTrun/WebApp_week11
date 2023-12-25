module.exports = {
    redirectPage: async (req, res, next) => {
        try {
            if (req.isAuthenticated()) {
                res.redirect('/admin');
            } else {
                res.redirect('/login');
            }
        } catch (error) {
            next(error);
        };
    },
}