import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER, // Sender gmail address
    pass: process.env.APP_PASSWORD, // App password from Gmail account
  },
  debug: true // enable debug mode
});

const mailOptions = {
    from: {
        name: 'George',
        address: process.env.USER,
    }, //sender address 
  to: "receiver@sender.com", // list of receivers
  subject: "Message title", //Subject line
  text: "Plaintext version of the message", // plain text body
  html: "<p>HTML version of the message</p>", // html body
}

const sendMail= async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        // console.log("Email has been sent!");
    } catch (error) {
       console.error(error) ;
    }
}

sendMail(transporter, mailOptions);