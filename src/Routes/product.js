const express = require('express');
const { addProduct } = require('../Controller/product');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const { adminMiddleware, requireSignin } = require('../common-middleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

router.post(
    '/createproduct',

    requireSignin,
    upload.array('productPicture'),
    addProduct
);

module.exports = router;
