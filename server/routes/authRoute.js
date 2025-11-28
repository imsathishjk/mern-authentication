import express from 'express';
import { getUserAuth, LogOut, userData, userLogin, userRegsiter } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';


const authRouter = express.Router();

// To Register a user
authRouter.post('/register', userRegsiter);

// To login
authRouter.post('/login', userLogin);

//To get User Data

authRouter.get('/data', userAuth, userData);
// To Logout
authRouter.post('/logout', LogOut);
// To get Auth State
authRouter.get('/is-auth', userAuth, getUserAuth);


export default authRouter