const userRouter = require('express').Router();
const {registerUser, loginUser} = require('../controllers/userController');

//@desc register user
//@route POST /api/user/
//@access Public
userRouter.post('/', registerUser)


//@desc login user
//@route GET /api/user/login
//@access Public
userRouter.post('/login', loginUser)

module.exports = userRouter;