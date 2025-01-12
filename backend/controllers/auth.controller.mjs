import crypto from "crypto";
import bcryptjs from "bcryptjs";
import User, {safeUserCredential} from "../models/User.model.mjs";
import { generateTokenAndSetCookie } from "../utils/jwt.mjs";
import { sendVerficationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/emails.mjs";
import { UtilsUser as UtilsUser } from '../utils/user.mjs';
import admin from "../utils/firebase.mjs";
// TODO: Remove the verification code from the response in the production version...

const verifyFireBaseToken = async (req) => {
    const {token} = req.body;
    if (!token){
        return {
            success: false,
            code: 401,
            message: "Unauthorized"
        }
    }
    try{
        const decodedToken = await admin.auth().verifyIdToken(token);
        return {
            success: true,
            token: decodedToken
        }
    }catch(error){
        return {
            success: false,
            code: 401,
            message: "Unauthorized"
        }
    }

}

export const signinMicrosoft = async (req, res) => {
    const firebase_verified = await verifyFireBaseToken(req);
    if(!firebase_verified.success || !firebase_verified.token){
        return res.status(firebase_verified.code).json({success:false, message: firebase_verified.message});
    }
    const {name, email, uid} = firebase_verified.token;
    try{
        if(!email || !name || !uid) throw new Error("Something Went wrong while decoding microsoft token");
        const userAlreadyExists = await User.findOne({ email }) // email is unique...
        const utilsUser = new UtilsUser(email)
        if(!utilsUser.isValid){
            return res.status(400).json({success:false, message: "Invalid domain, must be iitp.ac.in"});
        }
        if(userAlreadyExists && userAlreadyExists.isVerified){
            const user = await User.findOne({ uid }) // email is unique...
            if(!user){
                return res.status(400).json({success:false, message: "User not exists"});
            }
            generateTokenAndSetCookie(res, user._id);
            user.lastLogin = new Date();
            await user.save();
            res.status(200).json({
                success: true,
                message: "Logged in successfully",
                user: safeUserCredential(user),
            });
        }
        const user = (userAlreadyExists && !userAlreadyExists.isVerified)?
            userAlreadyExists
            :
            new User({
                email,
                uid,
                name,
                branch:utilsUser.branch, // NOTE: each sem we have to run a script to update this in database...
                semester:utilsUser.semester, // NOTE: each sem we have to run a script to update this in database...
                isVerified: true
            });

        if (userAlreadyExists && !userAlreadyExists.isVerified){
            user.name = name;
            user.uid = uid;
            user.isVerified = true;
        }

        await user.save();

        // jwt

        generateTokenAndSetCookie(res, user._id);

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: safeUserCredential(user),
		});

    }catch(error){
        return res.status(400).json({success:false, message: error.message});
    }
}

export const signup = async (req, res) => {
    const {email, password, name} = req.body;
    try{
        if(!email || !password || !name) throw new Error("all fields are required");
        const hashedPassword = await bcryptjs.hash(password, 7) // TODO: salt must be random and stored in the database...
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const userAlreadyExists = await User.findOne({ email }) // email is unique...
        const utilsUser = new UtilsUser(email)
        if(!utilsUser.isValid){
            return res.status(400).json({success:false, message: "Invalid domain, must be iitp.ac.in"});
        }
        if(userAlreadyExists && userAlreadyExists.isVerified){
            return res.status(400).json({success:false, message: "User already exists"});
        }

        const user = (userAlreadyExists && !userAlreadyExists.isVerified)?
            userAlreadyExists
            :
            new User({
                email,
                password: hashedPassword,
                name,
                branch:utilsUser.branch, // NOTE: each sem we have to run a script to update this in database...
                semester:utilsUser.semester, // NOTE: each sem we have to run a script to update this in database...
                verificationToken,
                verificationExpiresAt: Date.now() + 30 * 60 * 1000, // 30 minutes
            });

        if (userAlreadyExists && !userAlreadyExists.isVerified){
            user.password = hashedPassword;
            user.name = name;
            user.verificationToken = verificationToken;
            user.verificationExpiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes
        }

        await user.save();

        // jwt

        generateTokenAndSetCookie(res, user._id);

        await sendVerficationEmail(user.email, verificationToken);    

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: safeUserCredential(user),
		});

    }catch(error){
        return res.status(400).json({success:false, message: error.message});
    }
}

export const verifyEmail = async (req, res) => {
    const {code, email} = req.body;
    try{
        if(!email || !code) throw new Error("all fields are required");
        const user = await User.findOne({ email }) // email is unique...
        if(!user){
            return res.status(400).json({success:false, message: "User not exists"});
        }
        if (!user.verificationExpiresAt || user.verificationExpiresAt < Date.now()){
            return res.status(400).json({success:false, message: "Code expired"});
        }
        if (!user.verificationToken || user.verificationToken !== code){
            return res.status(400).json({success:false, message: "wrong code"});
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);
        return res.status(200).json({
            success:true, 
            message: "user is verified",
            user: safeUserCredential(user),
        });   
    }catch(error){
        console.log("error in verify email", error);
        return res.status(500).json({success:false, message: error.message});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        if(!email || !password) throw new Error("all fields are required");
        const user = await User.findOne({ email }) // email is unique...
        if(!user){
            return res.status(400).json({success:false, message: "User not exists"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({success:false, message: "Invalid password"});
        }
        generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: safeUserCredential(user),
        });
    }catch(error){
        console.log("error in login", error);
        return res.status(500).json({success:false, message: error.message});
    }
}
export const logout = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({success:true, message: "Logged out successfully"});
}

export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try{
        if(!email) throw new Error("all fields are required");
        const user = await User.findOne({ email }) // email is unique...
        if(!user){
            return res.status(400).json({success:false, message: "User not exists"});
        }
        // PASSWORD_RESET_REQUEST_TEMPLATE
        // reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 // 1 hours
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        
        await user.save();

        await sendPasswordResetEmail(user.email, `http://127.0.0.1:5000/reset-password/${resetToken}`); // TODO

        return res.status(200).json({success: true, message: "Password reset link sent successfully", resetToken}); // TODO remove resetToken in prod

    }catch(error){
        console.log("error in forgot password", error);
        return res.status(500).json({success:false, message: error.message});
    }
}

export const resetPassword = async (req, res) => {
    const {password} = req.body;
    const {token} = req.params;
    try{
        if(!password, !token) throw new Error("all fields are required");
        const user = await User.findOne({ 
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
         })
        if(!user){
            return res.status(400).json({success:false, message: "Invalid or expired reset token"});
        }
        if (password.length < 8){
            return res.status(400).json({success:false, message: "Password too short"});
        }
        // update password
        const hashedPassword = await bcryptjs.hash(password, 7);
		
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);    

		res.status(200).json({
			success: true,
			message: "Password reset successful",
		});

    }catch(error){
        console.log("error in reset password", error);
        return res.status(500).json({success:false, message: error.message});
    }
}

export const checkAuth = async (req, res) => {
    try{
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(400).json({success: false, message: "User not found"});
        }
        res.status(200).json({
            success: true,
            user: safeUserCredential(user),
        });
    }catch (error){
        console.log("error in checkAuth", error);
        return res.status(500).json({success:false, message: error.message});
    }
}

export const resendOtp = async (req, res) => {
    const {email} = req.body;
    try{
        if(!email) throw new Error("all fields are required");
        
        const user = await User.findOne({ email }) // email is unique...
        if(!user){
            return res.status(400).json({success:false, message: "Please signup first"});
        }
        if(user && user.isVerified){
            return res.status(400).json({success:false, message: "User already exists"});
        }

        user.verificationExpiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes

        await user.save();

        // jwt

        generateTokenAndSetCookie(res, user._id);

        await sendVerficationEmail(user.email, user.verificationToken);   
        
		res.status(201).json({
			success: true,
			message: "Email send successfully",
			user: safeUserCredential(user),
		});

    }catch(error){
        return res.status(400).json({success:false, message: error.message});
    }
}