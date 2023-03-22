const Joi = require('joi');
const { ValidationError } = require('../helpers/error');

module.exports = {
    addPostValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(20)
                .required(),
            email: Joi.string()
                .email({ maxDomainSegments: 2, tlds: { deny: ['ru'] } })
                .required(),
            phone: Joi.string()
                .min(7)
                .required(),
        })

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            next(new ValidationError(validationResult.error.details))
        }

        next();
    },
    favoriteSchema: (req, res, next) => {

        const schema = Joi.object({
            favorite: Joi.bool().required(),
        })

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            next(new ValidationError(validationResult.error.details))
        }


        next();
    }

}