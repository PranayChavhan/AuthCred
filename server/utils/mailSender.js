import nodemailer from"nodemailer";

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: "saijadhav1723@gmail.com",
                pass: "lcqf qech toba yzng"
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