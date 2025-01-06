import mongoose from "mongoose";
import { NODE_ENV } from "../utils/constants.mjs";

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
    branch: { // may useful if there is some issue on users roll no, else use utils->user.mjs
        type: String,
        enum: ['AI', 'CB', 'CE', 'CH', 'CM', 'CS', 'CT', 'EC', 'EE', 'ES', 'GT', 'HS', 'MA', 'MC', 'ME', 'MM', 'MT', 'PC', 'PH', 'PR', 'ST', 'VL'],
        required: false
    },
    semester: { // may useful if there is some issue on users roll no, else use utils->user.mjs
        type: Number,
        required: false
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    resetPasswordToken: String, // equivalent to {type: String}
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationExpiresAt: Date,
    role: {
        type:String,
        enum: ['admin', 'user', 'cr'],
        default:"user"
    },
}, {timestamps: true}); // created and updated fields are automatically added using timestamps: true


const User = mongoose.model('User', userSchema);

export function safeUserCredential(user){
    if(NODE_ENV === "development"){
        return{
            ...user._doc,
            password: undefined
        }   
    }
    return {
        ...user._doc,
        password: undefined,
        resetPasswordToken: undefined,
        resetPasswordExpiresAt: undefined,
        verificationToken: undefined,
        verificationExpiresAt: undefined,
    }
}

export default User;