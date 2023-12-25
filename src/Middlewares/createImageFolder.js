const fs = require('fs');
const path = require('path')

module.exports = async (req, res, next) => {
    if(req.file) {
        const id = req.body.ProID;
        let newDir = path.join(path.dirname(req.file.destination), `images/pid/${id}`)
        let oldPath = req.file.path;
        let newPath =  path.join(newDir,req.file.filename);
        if (!fs.existsSync(newDir)) await fs.mkdirSync(newDir);
        fs.rename(oldPath, newPath, (err) => {
            if (err) return next(err);
        });
    }
    next();
}