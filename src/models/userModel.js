import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    unique: true,
    required: [true, "Please provide a password"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide a email"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Please provide a username"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: String,
  verifyToken: String,
  verifyTokenExpiry: String,
});
const UserModel = mongoose.models.users || mongoose.model("users", userSchema);
export default UserModel;
