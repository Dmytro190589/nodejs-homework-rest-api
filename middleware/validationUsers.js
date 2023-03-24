const Joi = require('joi');
const { ValidationError } = require('../helpers/error');

module.exports = {
    addUserValidation: (req, res, next) => {
        const schema = Joi.object({
            password: Joi.string()
                .min(6)
                .max(20)
                .required(),
            email: Joi.string()
                .email({ maxDomainSegments: 2, tlds: { deny: ['ru'] } })
                .required(),
            subscription: Joi.string()
                .valid("starter", "pro", "business"),
        })

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            next(new ValidationError(validationResult.error.details))
        }
        next();
    },
    addSubscriptionValidation: (req, res, next) => {
        const schema = Joi.object({
            subscription: Joi.string()
                .valid("starter", "pro", "business"),
        })

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            next(new ValidationError(validationResult.error.details))
        }
        next();
    },
}