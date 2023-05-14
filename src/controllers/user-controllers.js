import userModel from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// REGISTER USER
export const registerUser = async(req,res)=>{
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if(user){
    return res.json({msg: "User already exist!"})
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await userModel.create({ email, name, password: hashedPassword })
  res.json({ msg: "user registered successfully!"})
}
//LOGIN USER
export const loginUser = async (req, res)=>{
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if(!user){
    return res.json({ msg: "User doesn't exist!" })
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
    return res.json({ msg: "Email or Password is incorrect!" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return res.json({ token, userId: user._id });
}
