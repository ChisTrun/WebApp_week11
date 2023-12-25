const fs = require('fs');
const multer = require('multer');
const path = require('path');

const ConfigMulter = (storeDir) => {
    const storage = multer.diskStorage({
        destination: async (req, file, callback) => {
            if (!fs.existsSync(storeDir)) await fs.mkdirSync(storeDir);
            callback(null, storeDir);
        },
        filename: (req, file, callback) => {
            const regex = /(?:\.([^.]+))?$/;
            const extension = regex.exec(file.originalname)[1];
            callback(null, 'main_thumbs.' + extension)
        },
    })
    return multer({storage: storage });
}

module.exports = ConfigMulter