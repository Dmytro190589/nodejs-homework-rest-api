const services = require('../../services/users')
const { sendMail } = require('../../helpers/sendMail')



const register = async (req, res) => {
    const { email, password } = req.body;
    const { verificationToken } = req.params;
    const result = await services.registration(email, password)
    await sendMail(email, verificationToken)
    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription,
            avatarURL: result.avatarURL,
            verificationToken: result.verificationToken
        }
    })
}

const login = async (req, res) => {

    const { email, password } = req.body;

    const token = await services.login(email, password)
    res.json({
        result: {
            token,
            email,
        }

    })
}

const current = async (req, res) => {
    const { token } = req.user;
    const { email, subscription } = await services.current(token)
    res.status(200).json({
        user: {
            email,
            subscription
        }
    })
}

const subscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await services.subscription(_id, subscription)
    return res.json({
        user: {
            result
        }
    })
}


const logout = async (req, res) => {
    const { id } = req.user
    await services.logout(id, { token: null })
    res.status(204).json()
}


const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user
    const avatarUrl = await services.updateAvatar(id, originalname, tempUpload)
    res.json({ avatarUrl })
}

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const { id } = req.user
    await services.verifyEmail(id, verificationToken)
    res.json({ message: 'Verification successful' })
}
module.exports = {
    register,
    login,
    current,
    subscription,
    logout,
    updateAvatar,
    verifyEmail
}