import nodemailer from "nodemailer";
const EMAIL = "joshbhavesh10@gmail.com";
const PASSWORD = "idontknow"; 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

export async function sendOTP(email : any, otp : string) {
  await transporter.sendMail({ 
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP is ${otp}. It is valid for 10 minutes.`
  });
};