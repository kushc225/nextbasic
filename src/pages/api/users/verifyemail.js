import dbConnect from "../../../../dbConfig/dbConnect";
import UserModel from "@/models/userModel";
import { errorHandler } from "../../../../middleware/error";
dbConnect();

export default async function POST(req, res) {
  try {
    const { token } = req.body;

    const user = await UserModel.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      errorHandler(res, 401, "Token Expired");
    }
    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return res
      .status(200)
      .json({ success: true, msg: "Email Verified...", user });
  } catch (error) {
    errorHandler(res, 500, error.message);
  }
}
