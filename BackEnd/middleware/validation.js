const { body , validationResult } = require("express-validator");

exports.registerValidation = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),
    
    body("email")
        .notEmpty()
        .withMessage("Emter vaild Email"),

    body("password")
        .isLength({ min : 6})
        .withMessage("Password should contains minimum 6 characters")
];

exports.loginValidation = [
    body("email")
        .isEmail()
        .withMessage("Enter vaild Email"),

    body("password")
        .notEmpty()
        .withMessage("password is required")
];

exports.urlValidation = [
    body("originalUrl")
        .isURL()
        .withMessage("Enter a valid URL")
]

exports.validate = (req , res,next) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        // console.log("hello");
        return res.status(400).json({
            success : false,
            errors : error.array()
        });
    }

    next();

};