const { ValidationError, WrongParamsError, NotFoundError } = require('./error')

const ctrlWrapper = (ctrl) => {
    return async (req, res, next) => {
        try {
            await ctrl(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}
const errorHandler = (error, req, res, next) => {
    if (error instanceof ValidationError ||
        error instanceof WrongParamsError
        || error instanceof NotFoundError
    ) {
        return res.status(error.status).json({ message: error.message })
    }
    res.status(500).json({ message: error.message })
}
module.exports = {
    ctrlWrapper,
    errorHandler
};