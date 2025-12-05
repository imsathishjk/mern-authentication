import { transporter } from "../config/transporter.js";
import userModal from "../models/userModal.js";
import bcrypt from 'bcryptjs';




export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModal.findById(userId)
        if (!user) {
            return res.json({ success: false, message: 'User Not Found' });
        }
        if (user.isVerified) {
            return res.json({ success: false, message: "Your account is already verified" })
        }
        const otp = Math.floor(Math.random() * 900000 + 100000);
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL, // sender address
            to: `${user.email}`, // list of receivers
            subject: "Account Verify OTP", // Subject line
            text: `Please use this OTP ${otp} to verify your account`, // plain text body
        }
        await transporter.sendMail(mailOptions)

        return res.json({ success: true, message: 'OTP Sent to your registered email', otp })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

};

export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const userId = req.userId;
    const user = await userModal.findById(userId);
    try {
        if (!userId) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        if (!user) {
            return res.json({ success: false, message: "User Not found" })
        }
        if (otp === '' || otp !== user.verifyOtp) {
            return res.json({ success: false, message: "Please enter a valid OTP" })
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" })
        };
        user.isVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save()
        return res.json({ success: true, message: 'Email Verified Successfully' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Sending OTP for resetting password
export const resetPasswordOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModal.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User Not Found' })
        }
        if (!email) {
            return res.json({ success: false, message: "Please enter a valid email" })
        };
        const otp = Math.floor(Math.random() * 900000 + 100000);
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 5 * 60 * 1000

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL, // sender address
            to: `${user.email}`, // list of receivers
            subject: "Password Reset OTP", // Subject line
            text: `Please use this OTP ${otp} to reset your password`, // plain text body
        }
        await transporter.sendMail(mailOptions)

        return res.json({ success: true, message: 'OTP Sent to your registered email', otp })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

// Resetting Password

export const resetPassword = async (req, res) => {
    try {
        const { otp, newPassword, email } = req.body;

        if (!email || !otp || !newPassword) {
            return res.json({ success: false, message: 'Missing Details' });
        }
        const user = await userModal.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User Not Found' });
        }
        if (Number(otp) === '' || Number(otp) !== user.resetOtp) {
            return res.json({ success: false, message: 'Please enter a valid OTP' });
        }
        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP Expired' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        user.password = hashedPassword;
        await user.save();

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })


        return res.json({ success: true, message: 'Password Reset Successfully, Login Again' });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}