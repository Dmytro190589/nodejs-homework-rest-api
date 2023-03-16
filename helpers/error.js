class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
        this.message = message
    }
}
class WrongParamsError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
        this.message = message;
    }
}
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
        this.message = message;

    }
}
class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.status = 409;
        this.message = message;

    }
}
class Unauthorized extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
        this.message = message;

    }
}

module.exports = {
    ValidationError,
    WrongParamsError,
    NotFoundError,
    ConflictError,
    Unauthorized
}