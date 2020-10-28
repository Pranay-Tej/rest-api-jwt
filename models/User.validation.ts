import joi from "joi";

const userSchemaValidation = joi.object({
    name: joi.string().required().min(6),
    email: joi.string().required().min(6).email(),
    password: joi.string().required().min(6)
});


export default userSchemaValidation;