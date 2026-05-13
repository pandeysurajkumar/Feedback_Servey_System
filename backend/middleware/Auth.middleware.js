import joi from 'joi';
import Error from '../utils/ApiError.js';
const signupValidation = (req, res, next) => {
    
        const schema = joi.object({
            name: joi.string().max(20).min(3).required(),
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
        })
        const { error } = schema.validate(req.body);
        if(error){
           return next(new Error(400, error.details[0].message));
          
        }
        next();
   
};
const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required(),
    })
    const { error } = schema.validate(req.body);
    if(error){
       console.log(error);
    }
    next(); 

};

export { signupValidation, loginValidation };