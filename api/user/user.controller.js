const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const user = require('./user.model');
const {jwtSecret} = require('../../config/properties')

const signIn = (req,res) => {
    const {email,password} = req.body
    user.findOne({email}).exec().then((user) => {
        if (!user) {
            res.status(401).json({ message: 'user dont exist'})
        }
        const isValid = bcrypt.compareSync(password, user.password)
        if (isValid) {
            const token = jwt.sign(user._id.toString(),jwtSecret)
            res.json({token})
        } else {
            res.status(401).json({ message: 'Validation failed'})
        }
    }).catch(err =>res.status(500).json({message: err.message}))
}
const createUser = async (req, res) => {
    const user = await new User(req.body.user).save()
    res.send(user)
}
module.exports = {
    signIn,
    createUser
}
