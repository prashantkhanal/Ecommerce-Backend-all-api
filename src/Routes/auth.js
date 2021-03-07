const express = require('express');
const { signup, signin } = require('../Controller/auth');

const router = express.Router();

//for signup process

router.post('/signup', signup);

//for signin process

router.post('/signin', signin);

//for to naviage the protected routes

module.exports = router;
