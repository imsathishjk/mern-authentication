import express from 'express';
import { resetPassword, resetPasswordOtp, sendVerifyOtp, verifyEmail } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';


const userRouter = express.Router();


userRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
userRouter.post('/verify-email', userAuth, verifyEmail);
userRouter.post('/reset-pass-otp', resetPasswordOtp);
userRouter.post('/reset-pass', resetPassword);

export default userRouter;