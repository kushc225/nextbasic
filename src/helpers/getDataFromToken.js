import Jwt from "jsonwebtoken";
import dotevn from "dotenv";
dotevn.config();
export const getDataFromToken = async (req) => {
  try {
    const cookies = await req.headers.cookie.split("=")[1];
    const decodedToken = Jwt.verify(cookies, process.env.JWT_SECRET_KEY);
    res
      .status(200)
      .json({ success: true, msg: "verify successfully", user: decodedToken });
  } catch (error) {
    throw new Error(error.message);
  }
};
