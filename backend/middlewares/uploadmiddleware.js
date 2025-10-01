const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + "-" + file.originalname;
        cb(null, fileName)
    }
})

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/
    const ext = path.extname(file.originalname).toLowerCase()
    if (allowed.test(ext)) cb(null, true)

    else (cb(new Error("Only image are allowed!"), false))
}

exports.upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 },

})
