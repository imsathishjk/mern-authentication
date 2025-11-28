import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verifyOtp: { type: Number, default: '' },
    verifyOtpExpireAt: { type: Number, default: 0 },
    resetOtp: { type: Number, default: '' },
    resetOtpExpireAt: { type: Number, default: 0 }

});

const userModal = mongoose.models.user || mongoose.model('user', userScheme);

export default userModal;