const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if(!token){
        res.status(401).json({ message: 'Unauthorized'})
    }

    const isBlacklisted = await userModel.findOne({ token: token });

    if(isBlacklisted){
        return res.status(401).json({ message: 'Unauthorized' })    
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();

    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' })
    }
}