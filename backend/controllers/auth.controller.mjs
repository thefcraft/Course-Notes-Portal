import User, {safeUserCredential} from "../models/User.model.mjs";
import { generateTokenAndSetCookie } from "../utils/jwt.mjs";
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
        if(userAlreadyExists){
            generateTokenAndSetCookie(res, userAlreadyExists._id);
            userAlreadyExists.uid = uid;
            userAlreadyExists.lastLogin = new Date();
            await userAlreadyExists.save();
            res.status(200).json({
                success: true,
                message: "Logged in successfully",
                user: safeUserCredential(userAlreadyExists),
            });
        }
        const user = new User({
                                email,
                                uid,
                                name,
                                branch: utilsUser.branch, // NOTE: each sem we have to run a script to update this in database...
                                semester: utilsUser.semester // NOTE: each sem we have to run a script to update this in database...
                            });
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

export const logout = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({success:true, message: "Logged out successfully"});
}

export const checkAuth = async (req, res) => {
    try{
        const user = req.user;
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
