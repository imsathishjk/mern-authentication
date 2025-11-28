import userModal from "../models/userModal.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

// User Regsiter controller function
export const userRegsiter = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.json({ success: false, message: 'Details Missing' });
        }
        const user = await userModal.findOne({ email })
        if (user) {
            return res.json({ success: false, message: 'User Already registered, Please Login' })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModal({ username, email, password: hashedPassword });
        await newUser.save();
        // Generate Token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_TEXT, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, message: 'User Registered Successfully' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// User Login Controller Function

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModal.findOne({ email });
        if (!email || !password) {
            return res.json({ success: false, message: 'Invalid Credentials' })
        }
        if (!user) {
            return res.json({ success: false, message: 'User Not Found' });
        };
        // Retrive Hashed Password
        const isPassMatch = await bcrypt.compare(password, user.password);

        // Generate Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TEXT, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

      

        if (isPassMatch) {
            return res.json({ success: true, message: 'Login Successful' })
        } else {
            return res.json({ success: false, message: 'Invalid Passsword' });
        }

    } catch (error) {
        console.log(error.message)
    }

}

// User Logout Function

export const LogOut = async (req, res) => {
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get User Data;

export const userData = async (req, res) => {
    const userId  = req.userId;
    try {
        const userData = await userModal.findById(userId);
        if (!userId) {
            return res.json({ success: false, message: 'User Not Found' })
        }
        return res.json({ success: true, message: 'Data Fetched Successfully', data: userData });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Get user authentication state

export const getUserAuth = async (req, res) => {
    try {
        res.json({ success: true })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}