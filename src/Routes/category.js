const express = require('express');
const { adminMiddleware, requireSignin } = require('../common-middleware');
const { addCategory, fetchCategories } = require('../Controller/category');

const router = express.Router();

router.post('/createcategory', requireSignin, addCategory);
router.get('/fetchcategory', requireSignin, fetchCategories);

module.exports = router;
