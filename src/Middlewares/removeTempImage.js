const fs = require('fs');

module.exports = async (req, res, next) => {
    if (req.file) {
        let dirPath = req.file.destination;
        fs.rmdir(dirPath, { recursive: true }, (err) => {
            if (err) next(err);
        });
    }
    res.redirect('/admin');
}