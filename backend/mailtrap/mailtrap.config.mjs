import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import { MAILTRAP_TOKEN } from "../utils/constants.mjs";

dotenv.config()

const TOKEN = MAILTRAP_TOKEN;

export const mailtrapClient = new MailtrapClient({
  token: TOKEN
});

export const sender = {
  email: "no-reply@thefcraft.site",
  name: "College Notes's Team",
};
// const recipients = [
//   {
//     email: "admin@thefcraft.site",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);