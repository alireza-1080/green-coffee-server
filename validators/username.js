import joi from 'joi';

const username = joi.string().trim().min(5).max(50).required().messages({
    'string.base': 'Username must be a string',
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username must be at least {#limit} characters long',
    'string.max': 'Username cannot be more than {#limit} characters long',
    'any.required': 'Username is required'
});

export default username;