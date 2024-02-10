import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword, comparePasswords } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
import { UnauthenticatedError } from "../errors/cutomErrors.js";

export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User has created" });
};

export const login = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("Invalid credentials");

  const isPasswordCorrect = await comparePasswords(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 1000*60*60*24
  res.cookie('token',token,{
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production'
  });
  res.status(StatusCodes.OK).json({ msg: "User logged In" });
};

export const logout = async (req,res)=>{
  res.cookie("token","logout",{
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === 'production'
  })
  res.status(StatusCodes.OK).json({msg: "User logged out"})
}