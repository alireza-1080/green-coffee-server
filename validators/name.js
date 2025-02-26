import joi from 'joi';

const name = joi.string().trim().min(2).max(50).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least {#limit} characters long',
    'string.max': 'Name cannot be more than {#limit} characters long',
    'any.required': 'Name is required'
});

export default name;