const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const auth = require('../middleware/auth.js');

const {registerValidation , loginValidation , urlValidation ,validate} = require('../middleware/validation.js')


router.post('/register',registerValidation , validate , authController.register);
router.post('/login' , loginValidation, validate , authController.login);   
router.get('/user' , auth ,urlValidation , validate , authController.getUser);  


module.exports= router;