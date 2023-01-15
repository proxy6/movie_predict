
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const SECRET_KEY = `${process.env.JWT_SECRET}`


module.exports = {
    GenerateSignature: async (email) => {
        return await jwt.sign(email, SECRET_KEY, { expiresIn: '1d' /*Expires in 1 day*/ })
    },
    GenerateRefreshToken: async(payload)=>{
        return await jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' /*Expires in 1 day*/ })
    },
    HashPassword: async (password) => {
        const salt = bcrypt.genSaltSync(10)
        const userPassword = bcrypt.hash(password, salt)
        return userPassword
    },

    validatePassword: async (password, savedPassword)=>{
        const validatePassword = bcrypt.compareSync(password, savedPassword)
        if(!validatePassword) return false
        return true
    },
}

