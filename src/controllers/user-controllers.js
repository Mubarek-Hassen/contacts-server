import userModel from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// REGISTER USER
export const registerUser = async (req,res)=>{
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if(user){
    return res.json({msg: "User already exist!"})
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(salt, password);
  const newUser = await userModel.create({ email, name, password: hashedPassword })
  res.json({ msg: "user registered successfully!"})
}

//LOGIN USER
