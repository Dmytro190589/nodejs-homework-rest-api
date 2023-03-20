const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const { ConflictError, Unauthorized } = require('../helpers/error');
const { User } = require('../models')


const registration = async (email, password) => {
    const user = await User.findOne({ email })
    if (user) {
        throw new ConflictError(`${email} in use`)
    }
    return User.create({ email, password })
}

const login = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Unauthorized("Email or Password is wrong")
    }
    const token = jwt.sign({
        id: user.id,
    }, process.env.JWT_SECRET)

    return token;

}

module.exports = {
    registration,
    login,

}