import joi from 'joi';

const password = joi.string().trim().min(8).max(50).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,50}$')).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least {#limit} characters long',
    'string.max': 'Password cannot be more than {#limit} characters long',
    'string.pattern.base': 'Password must include at least:\n1 uppercase letter\n1 lowercase letter\n1 digit\n1 special character',
    'any.required': 'Password is required'
});

export default password;