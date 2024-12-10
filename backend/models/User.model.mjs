import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String, // equivalent to {type: String}
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationExpiresAt: Date,
}, {timestamps: true}); // created and updated fields are automatically added using timestamps: true


export const User = mongoose.model('User', userSchema);