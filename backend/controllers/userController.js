//get user model
const User = require('../models/userModel');

//get async handler for error handling
const asyncHandler = require('express-async-handler');

//get jsonwebtoken for token generation
const jwt = require('jsonwebtoken');

//get bcrypt for password hashing
const bcrypt = require('bcryptjs');

//get generate token function
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{ expiresIn:'30d'}) 
}


//@desc register user
//@route POST /api/user/
//@access Public
const registerUser = asyncHandler(async(req,res)=>{
    const {name, email, password, confirmPassword} = req.body;
    if(!name || !email || !password || !confirmPassword)
    {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    if(password !== confirmPassword)
    {
        res.status(400);
        throw new Error('Passwords do not match');
    }

    //check if user already exists
    const userExists = await User.findOne({email})
    if(userExists)
    {
        res.status(400);
        throw new Error('User already exists');
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create nre user
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })
    if(user)
    {
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid user data');
    }
})

//@desc login user
//@route POST /api/user/login
//@access Public
const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password)
    {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    
    //check if user exists or not
    const user = await User.findOne({email});

    //match password
    if(user && await bcrypt.compare(password, user.password))
    {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else
    {
        res.status(400);
        throw new Error('Invalid credentials');
    }
})

module.exports = {
    registerUser,
    loginUser
}