const multer = require('multer');
let path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // try {
        //     if (!fs.existsSync(('uploads/user_'+req.params.uid))) {
        //         fs.mkdirSync(('uploads/user_'+req.params.uid))
        //     }
        // } catch (err) {
        //     console.error(err)
        // }
        cb(null, 'uploads/pool/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg','image/jfif','image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        console.log("unSupported File Type");
        cb(null, false);
    }
}

var upload = multer({ storage: storage, limits: 1024 * 1024 * 2.5, fileFilter });
//max 2.5mb file can be uploded
module.exports = upload