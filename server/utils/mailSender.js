import nodemailer from"nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        const info = await transporter.sendMail({
            from: 'AuthentiCred',
            to: email,
            subject: title,
            html: body
        });

        // console.log('Info of sent mail - ', info);
        return info;
    }
    catch (error) {
        console.log('Error while sending mail (mailSender) - ', error);
    }
}

export default mailSender;