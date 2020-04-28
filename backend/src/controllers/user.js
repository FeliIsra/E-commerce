const User = require('../Models/user')
const jwt = require('jsonwebtoken') // To generate signed token
const expressJwt = require('express-jwt') // For authorization check
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.singup = (req, res) => {
    //console.log('req.body', req.body)
    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            })
        }

        user.salt = undefined
        user.hashed_password = undefined

        res.json({
            user
        });
    })
};

exports.singin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                err: 'User with that email does not exist. Please singup'
            })
        }

        // if user is found make sure the email and pass match
        // create authentic method in user model
        if(!user.authenticate(password)) {
            return res.status(401).json({
                err: 'Email and password dont match'
            })
        }
        // generate a singned token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999})
        // return response with user and token to frontend client
        const { _id, name, email, role } = user
        return res.json({token, user: { _id, email, name, role }})


    })
}

exports.singout = (req, res) => {
    res.clearCookie('t')
    res.json({message: 'Singout succes'})
}