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
    await User.findByIdAndUpdate(user.id, { token })
    return { token, user };

}
const current = async (token) => {
    return await User.findOne({ token })
}

const subscription = async (id, body) => {
    const user = await User.findByIdAndUpdate( id , body, { new: ['starter', 'pro', 'business'] })
    if (!user) {
        throw new Unauthorized(`Not found user by ${id}`)
    }
    return user;
}

const logout = async (id, token) => {
    return await User.findByIdAndUpdate(id, token)
}

module.exports = {
    registration,
    login,
    current,
    subscription,
    logout
}