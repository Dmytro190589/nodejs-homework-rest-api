const services = require('../../services/users')

const register = async (req, res) => {
    const { email, password } = req.body;
    const result = await services.registration(email, password)
    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription
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
module.exports = {
    register,
    login,
    current,
    subscription,
    logout
}