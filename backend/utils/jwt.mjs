import jwt from "jsonwebtoken";
import { JWT_SECRET, NODE_ENV } from "./constants.mjs";

export const generateTokenAndSetCookie = (res, userId) => {
	const token = jwt.sign({ userId }, JWT_SECRET, {
		expiresIn: "30d",
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
	});

	return token;
};