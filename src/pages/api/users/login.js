import UserModel from "@/models/userModel";
import dbConnect from "../../../../dbConfig/dbConnect";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { errorHandler } from "../../../../middleware/error";
import { cookieSetter } from "../../../../utils/features";
dotenv.config();
export default async function post(req, res) {
  try {
    if (req.method !== "POST")
      return errorHandler(res, 400, "Only POST Method is allowed");

    dbConnect();
    const { email, password } = req.body;
    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      return res.status(401).json({ success: false, msg: "User Not Exists" });
    }
    const isValid = await bcrypt.compare(password, existUser.password);
    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid password" });
    }

    const payload = {
      id: existUser._id,
      username: existUser.username,
      email: existUser.email,
    };

    const token = await Jwt.sign(payload, process.env.JWT_SECRET_KEY);
    cookieSetter(res, token, true);
    res.status(201).json({ success: true, token, msg: "Login successfully" });
  } catch (error) {
    res.status(500).json({ success: false, err: error.message });
  }
}
