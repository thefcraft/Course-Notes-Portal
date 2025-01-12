import { mailtrapClient, sender } from "./mailtrap.config.mjs";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.mjs";
import { NODE_ENV } from "../utils/constants.mjs";


export const sendVerficationEmail = async (email, verificationToken) => {
  const recipient = [{email}]
  try {
        if (NODE_ENV === "production"){
          const response = await mailtrapClient.send({
            from: sender,
            to: recipient, 
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
          })
        }
        
        console.log("Email sent successfully");
    }catch (error){
      console.error(`Error sending verification`, error);
		  throw new Error(`Error sending verification email: ${error}`);
    }
}

export const sendWelcomeEmail = async (email, userName) => {
    const recipient = [{email}]
    try {
        if (NODE_ENV === "production"){
          const response = await mailtrapClient.send({
            from: sender,
            to: recipient, 
            subject: "Welcome to Notes Share Portal",
            html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", userName),
            category: "welcome",
          })
        }
        console.log("Email sent successfully");
    }catch (error){
        console.error(`Error sending verification`, error);
		throw new Error(`Error sending verification email: ${error}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{email}]
  try {
      if (NODE_ENV === "production"){
        const response = await mailtrapClient.send({
          from: sender,
          to: recipient, 
          subject: "Reset your password",
          html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
          category: "Password Reset",
        })
      }
      console.log("Email sent successfully");
  }catch (error){
    console.error(`Error sending reset password email`, error);
    throw new Error(`Error sending reset password email: ${error}`);
  }
}

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{email}]
  try {
      if (NODE_ENV === "production"){
        const response = await mailtrapClient.send({
          from: sender,
          to: recipient, 
          subject: "Password reset Successful",
          html: PASSWORD_RESET_SUCCESS_TEMPLATE,
          category: "Password Reset",
        })
      }
      console.log("Email sent successfully");
  }catch (error){
    console.error(`Error sending reset password success email`, error);
    throw new Error(`Error sending reset password success email: ${error}`);
  }
}