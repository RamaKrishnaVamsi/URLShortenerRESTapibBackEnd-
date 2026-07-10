const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const auth = require('../middleware/auth.js');

router.post('/register' , authController.register);
router.post('/login' , authController.login);   
router.get('/user' , auth , authController.getUser);  

module.exports= router;