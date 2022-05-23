const multer = require("multer")
const path = require("path")

const diskStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename : (req, file, cb) => {
        cb(null, file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage : diskStorage,
    fileFilter : (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error('Images format not suport, please use png, jpg and jpeg.'))
        }

        cb(null, true)
    },
    limits : {
        fileSize: 1024 * 1024
    }
})

module.exports = upload