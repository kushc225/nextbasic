const { getDataFromToken } = require("@/helpers/getDataFromToken");
import { errorHandler } from "../../../../middleware/error";
import Jwt from "jsonwebtoken";
export default async function get(req, res) {
  try {
    if (req.method !== "GET") {
      errorHandler(res, 500, "Only accessable through get request");
    }
    const cookies = await req.headers.cookie.split("=")[1];
    const decodedToken = Jwt.verify(cookies, process.env.JWT_SECRET_KEY);
    res.status(200).json({
      success: true,
      msg: "verify successfully",
      user: decodedToken,
    });
  } catch (error) {
    return errorHandler(res, 500, error.message);
  }
}
