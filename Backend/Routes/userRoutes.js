const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser, getUserProfile, userLogOut } = require('../Controllers/userController')
const { authUser } = require('../middlewares/authMiddleware')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'), 
],
registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'), 
],
loginUser
)

router.get('/profile', authUser, getUserProfile)
router.get('/logout', authUser, userLogOut)
  


module.exports = router;