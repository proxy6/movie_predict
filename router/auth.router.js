const express = require('express');
const router = express.Router()
const { dashboard} = require('../controller/dashboard');
const { LogIn, Signup, getSignupPage, getLoginPage } = require('../controller/auth.controller');

router.get('/dashboard', LogIn, dashboard)
router.get('/signup', getSignupPage)
router.get('/login', getLoginPage)
router.post('/dashboard', LogIn, dashboard)
router.post('/signup', Signup)
module.exports = router