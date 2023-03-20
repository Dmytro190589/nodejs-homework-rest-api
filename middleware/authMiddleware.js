const jwt = require('jsonwebtoken')

const { Unauthorized } = require('../helpers/error');


const authMiddleware = (req, res, next) => {
    const [tokenType, token] = req.headers.authorization.split(' ');

    if (!token) {
        next(new Unauthorized("Not authorized"))
    }
    try {
        const user = jwt.decode(token, process.env.JWT_SECRET)
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        next(new Unauthorized('Invalid token'))
    }
}

module.exports = {
    authMiddleware
}