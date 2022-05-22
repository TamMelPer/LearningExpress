const Joi = require( 'joi' );

const CredentialsSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string()
});

module.exports = CredentialsSchema;

