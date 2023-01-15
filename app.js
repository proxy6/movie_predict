const express = require('express')
const ejs = require('ejs');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const database = require('./db/connection')
const path = require('path')
const app = express();
require('dotenv').config()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const indexRouter =  require('./router/index')
//set up static view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
// cookie parser middleware
app.use(cookieParser());
app.use('/', indexRouter)
//set up index route`
//not found error route
app.get('*', (req, res)=>{
    res.render('error-404')
})
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log('server started on port ' + port)
})