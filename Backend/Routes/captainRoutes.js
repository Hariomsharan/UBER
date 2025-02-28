const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain} = require('../Controllers/captainController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate number must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isLength({ min: 3 }).withMessage('Vehicle type must be at least 3 characters long'),    
    
],
registerCaptain
) 


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
], loginCaptain) 


router.get('/profile', authMiddleware.authCaptain, getCaptainProfile)


router.get('/logout', authMiddleware.authCaptain, logoutCaptain)
module.exports = router;