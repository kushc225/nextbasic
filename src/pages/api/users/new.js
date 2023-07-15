import UserModel from "@/models/userModel";
import dbConnect from "../../../../dbConfig/dbConnect";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export default async function (req, res) {
  try {
    dbConnect();
    const { username, password, email } = req.body;
    const existsUsername = await UserModel.findOne({ username });
    const existsEmail = await UserModel.findOne({ email });
    if (existsUsername) {
      return res
        .status(401)
        .json({ success: false, msg: "Username already taken" });
    }
    if (existsEmail) {
      return res
        .status(401)
        .json({ success: false, msg: "Email already taken" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPass,
    });
    const savedUser = await newUser.save();

    // send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    res.status(200).json({ success: true, msg: "user created", savedUser });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
}
