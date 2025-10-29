import { body
 } from "express-validator";


const userRegisterValidator=()=>{
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is not in correct format"),

        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lowercase")
            .isLength({min:3})
            .withMessage("Username m,must be atleast three character long"),

        body("password")
            .trim()
            .notEmpty()
            .withMessage("The password cannot be empty")
            .isLength({min:5 , max:8})
            .withMessage("The password does not follow the length constraints"),
            
        body("fullName")
            .trim()
            .optional()
            
        
    ]

}

const userLoginValidator=()=>{
    return [
        body("email")
        .optional()
        .isEmail()
        .withMessage("Email is invalid"),

        body("password")
        .notEmpty()
        .withMessage("Password is required")
    ]
}


const userChangeCurrentPassword=()=>{
    return [
        body("oldPassword")
        .notEmpty()
        .withMessage("Old password Required"),

        body("newPassword")
        .notEmpty()
        .withMessage("New Password is required"),


    ];
}


const userForgotPassword=()=>{
    return [
    body("emai")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email is invalid"),
    ];
};

const userResetPassword =()=>{
    return [

        body("newPassword")
        .notEmpty()
        .withMessage("Passwordo is required ")
    ];
};

export{
    userRegisterValidator ,
    userLoginValidator ,
    userChangeCurrentPassword ,
    userForgotPassword,
    userResetPassword
};