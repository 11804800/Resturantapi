const express = require('express');
const bodyParder = require("body-parser");
const authenticate = require("../authenticate");
const multer = require('multer');


const imagefileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/images');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
        , fileFilter: imagefileFilter
    }).single('Image')

    const uploadRouter = express.Router();

    uploadRouter.use(bodyParder.json());

    uploadRouter.route('/')
        .post(upload, (req, res) => {
            res.statusCode = 200;
            res.setHeader('content-type', 'application/json');
            res.json(req.file.originalname);
        });

    module.exports = uploadRouter;