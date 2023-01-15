const express = require('express');
const router = express.Router()
const LoginRouter = require('./auth.router')
const crewRouter = require('./crew.router')
router.get('/', (req, res)=>{
    res.render('index')
})
router.use('/', LoginRouter)
router.use('/', crewRouter)
module.exports = router