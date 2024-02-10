import mongoose from "mongoose";
import { role } from "../utils/constants.js";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "LastName",
  },
  location: {
    type: String,
    default: "Mumbai",
  },
  role: {
    type: String,
    enum: Object.values(role),
    default: "user",
  },
  avatar: String,
  avatarPublicId: String,
});

userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", userSchema);
