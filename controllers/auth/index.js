const services = require('../../services/users')
const { sendEmail } = require('../../helpers/sendMail')



const register = async (req, res) => {
    const { email, password } = req.body;
    const result = await services.registration(email, password)
    const verificationToken = result.verificationToken;
    await sendEmail(email, verificationToken)
    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription,
            avatarURL: result.avatarURL,
            verificationToken: verificationToken
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
    await services.verifyEmail(verificationToken)
    res.json({ message: 'Verification successful' })
}
const repeatEmail = async (req, res) => {
    const { email } = req.body
    const user = await services.repeatEmail(email)
    if (user.verify) {
        return res.status(400).json({ message: "Verification has already been passed" })
    }
    sendEmail(email, user.verificationToken)
    res.json({ message: "Verification email sent" })
}


module.exports = {
    register,
    login,
    current,
    subscription,
    logout,
    updateAvatar,
    verifyEmail,
    repeatEmail
}