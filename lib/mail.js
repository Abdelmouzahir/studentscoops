'use server';
import nodemailer from "nodemailer";

export async function sendMail({to, name, subject, body}){
  //initiate SMTP
  const {SMTP_EMAIL, SMTP_PASSWORD} = process.env;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD
        }
    });

    try {
        const testResult = await transporter.verify();
        console.log('Connected to SMTP Server: ', testResult);
    } catch (error){
        console.error('Error connecting to SMTP Server: ', error);
    }

    //send mail
    try {
        const info = await transporter.sendMail({
            from: SMTP_EMAIL,
            to: to,
            subject: subject,
            text: body
        });

        console.log('Message sent: %s', info.messageId);
        return info;

    } catch (error) {
        console.error('Error sending mail: ', error);
        return error;
    }
}

