const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const Jimp = require("jimp");



const { ConflictError, Unauthorized, NotFoundError } = require('../helpers/error');
const { v4 } = require('uuid')
const { User } = require('../models')
const path = require('path');
const fs = require("fs/promises")


const registration = async (email, password) => {
    const user = await User.findOne({ email })
    if (user) {
        throw new ConflictError(`${email} in use`)
    }
    const avatarURL = gravatar.url(email)
    const verificationToken = v4();
    return User.create({ email, password, avatarURL, verificationToken })
}

const login = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user || !user.verify || !await bcrypt.compare(password, user.password)) {
        throw new Unauthorized("Email or Password is wrong")
    }

    const token = jwt.sign({
        id: user.id,
    }, process.env.JWT_SECRET)
    await User.findByIdAndUpdate(user.id, { token })
    return token;

}
const current = async (token) => {
    return await User.findOne({ token })
}

const subscription = async (id, subscription) => {

    const user = await User.findByIdAndUpdate(id, subscription, { new: true, select: " id email subscription" })
    if (!user) {
        throw new Unauthorized(`Not found user by ${id}`)
    }
    return user;
}

const logout = async (id, token) => {
    return await User.findByIdAndUpdate(id, token)
}

const avatarDir = path.join(__dirname, "../", "public", "avatars")
const updateAvatar = async (id, originalname, tempUpload) => {
    const imageName = `${id}_${originalname}`
    try {
        const resultUpload = path.join(avatarDir, imageName)
        const newAvatar = await Jimp.read(tempUpload);
        newAvatar.resize(250, 250).write(tempUpload)

        await fs.rename(tempUpload, resultUpload)
        const avatarURL = path.join("public", "avatars", imageName)
        await User.findByIdAndUpdate(id, { avatarURL })
        return avatarURL
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
}

const verifyEmail = async (id, verificationToken) => {
    const user = await User.findOne({ verificationToken })
    if (!user) {
        throw NotFoundError('User not found')
    }
    return await User.findByIdAndUpdate(id, { verify: true, verificationToken: null })

}

module.exports = {
    registration,
    login,
    current,
    subscription,
    logout,
    updateAvatar,
    verifyEmail
}