//Load the library for file upload
const multer = require ('multer')

//Middleware to handle upload file validity
const upload = multer ({
    limits: {
        fileSize: 1000000
    },

    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error ('Please upload a JPG, JPEG or PNG file'))
        }

        cb(undefined, true)

    }
})

//Export as a single module
module.exports = upload;