const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    // Check if the token is in the headers
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        {
            try
            {
                token = req.headers.authorization.split(' ')[1]
                // Decode the token
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                // Get the user from the token and add it to the request
                req.user = await User.findById(decoded.id).select('-password')
                next()
            }
            catch(error)
            {
                console.error(error)
                res.status(401)
                throw new Error('Not authorized, token failed')
            }
        }
        if(!token)
        {
            res.status(401)
            throw new Error('Not authorized, no token')
        }     
})
module.exports = {protect}