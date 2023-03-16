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
    const { email, password, subscription = "starter" } = req.body;
    const token = await services.login(email, password)
    res.json({
        token,
        email,
        subscription
    })
}

module.exports = {
    register,
    login
}