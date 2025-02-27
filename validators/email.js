import joi from 'joi';

const email = joi.string().trim().email().required().lowercase().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required'
});

export default email;