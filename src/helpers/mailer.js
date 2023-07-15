// domain.com/verifytoken/alsdkjfklasjdfsja
// domain.com/verifytoke?token=jlsdjlf // to access token -->window.location.search

import nodemailer from "nodemailer";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // create a token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await UserModel.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await UserModel.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const mailOption = {
      from: "kushc225@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p> Click <a href ="${
        process.env.DOMAIN
      }/verifytoken?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verfiy email" : "Reset your password! "
      } or copy paste the link below in your browser <br> ${
        process.env.DOMAIN
      }/verifytoken?token=${hashedToken}`,
    };
    const mailResponse = await transport.sendMail(mailOption);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
