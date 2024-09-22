const User = require("../models/user-model");

const userRegisterValidation = {
   email: {
        in: ["body"],
        exists:{
            errorMessage: "email field is required",
           
        },
        notEmpty: {
            errorMessage: "Email should not be empty",
        },
        isEmail: {
            errorMessage: "Email is not valid",
        },
        trim: true,
        normalizeEmail: true,
        custom: {
            options: async (value) => {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error("Email already registered");
                }
                return true;
            },
        },
    },
    password: {
        in: ["body"],
        exists:{
            errorMessage: "password field is required",
       
        },
        notEmpty: {
            errorMessage: "Password should not be empty",
        },
        isLength: {
            options: { min: 8, max: 16 },
            errorMessage: "Password length should be 8 - 16 characters",
        },
        trim: true,
    },
};
const userLoginValidation = {
    email: {
         in: ["body"],
         exists:{
             errorMessage: "email field is required",
             bail:true
         },
         notEmpty: {
             errorMessage: "Email should not be empty",
         },
         isEmail: {
             errorMessage: "Email is not valid",
         },
         trim: true,
         normalizeEmail: true,
         
     },
     password: {
         in: ["body"],
         exists:{
             errorMessage: "password field is required",
             bail:true
         },
         notEmpty: {
             errorMessage: "Password should not be empty",
         },
         
         trim: true,
     },}
module.exports = { userRegisterValidation, userLoginValidation};