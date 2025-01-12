import { MailtrapClient } from "mailtrap";
import { MAILTRAP_TOKEN, SMTP_HOST, SMTP_MAIL, SMTP_PASSWORD, SMTP_PORT, SMTP_SERVICE } from "../utils/constants.mjs";
import nodemailer from "nodemailer";
const TOKEN = MAILTRAP_TOKEN;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  service: SMTP_SERVICE,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for port 465, false for other ports
  auth: {
    user: SMTP_MAIL,
    pass: SMTP_PASSWORD,
  },
});

class NotMailtrapClient {
  async send(mail){
    const {from, to, subject, html, category} = mail;
    const info = await transporter.sendMail({
      from: from,
      to: to.map(obj => obj.email).join(', '),
      subject: subject,
      html: html,
    });
    console.log(`Email Sended to the ${to.map(obj => obj.email).join(', ')}`)
    return info
  }
}
export const sender = `"College-Notes 👋" <${SMTP_MAIL}>`;
export const mailtrapClient = new NotMailtrapClient();



// export const mailtrapClient = new MailtrapClient({
//   token: TOKEN
// });

// export const sender = {
//   email: "no-reply@thefcraft.site",
//   name: "College Notes's Team",
// };
// const recipients = [
//   {
//     email: "admin@thefcraft.site",
//   }
// ];
