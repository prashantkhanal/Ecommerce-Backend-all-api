const express = require('express');
const { userMiddleware } = require('../common-middleware');
const { addCart } = require('../Controller/cart');
const router = express.Router();

router.post('/addcart', userMiddleware, addCart);

module.exports = router;
