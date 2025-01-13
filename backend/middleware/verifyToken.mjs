import jwt from "jsonwebtoken";
import User from "../models/User.model.mjs";
import { JWT_SECRET } from "../utils/constants.mjs";

export const verifyToken = async (req, res, next) => {
	const token = req.cookies.token;
	console.log(token)
	if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		console.log(decoded)
		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

		req.userId = decoded.userId;
		const user = await User.findById(decoded.userId);
		req.user=user
		// console.log(user)
		next();
	} catch (error) {
		console.log("Error in verifyToken ", error);
		return res.status(401).json({ success: false, message: "Unauthorized - wrong token provided" });
	}
};