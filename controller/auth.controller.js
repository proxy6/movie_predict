const { User } = require("../models/user")
const { HashPassword, validatePassword, GenerateSignature } = require('../utils/auth')
exports.LogIn = async (req, res, next)=> {
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user) return res.render('login', {error: "User does not Exist"})
        const validatePass = await validatePassword(password, user.password)
        if(validatePass == false) return res.render('login', {error: "Password Incorrect"})

             req.session.email = user.email
             req.session.id = user._id
             req.session.role = user.role
     
             if(req.session.returnTo && req.session.returnTo != '/' ){
                 return res.redirect(req.session.returnTo)
             }
             next()
              
    }catch(e){
        console.log(e)
        res.render('login', {error: "Something went wrong, Try again"})
    }
}
exports.Signup = async (req, res, next)=> {
    const {email, password} = req.body
    const hashedPassword = await HashPassword(password)
    try{
        const existingUser = await User.findOne({email})
        if(existingUser) return res.render('signup', {error: "User Email Exist Already"}) 
        const user = await User.create({
            email,
            // role: "Admin",
            password: hashedPassword
        })

        res.render('login')
    }catch(e){
        console.log(e)
        res.render('signup', {error: "Email or Password Incorrect"})
    }
}
exports.getSignupPage = async(req, res)=>{
    res.render('signup', {error: ''})
}
exports.getLoginPage = async(req, res)=>{
    res.render('login', {error: ''})
}