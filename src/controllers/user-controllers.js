import userModel from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// REGISTER USER
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password){
    return res.json({msg: "Some input is empty"})
  }
try {
  const user = await userModel.findOne({ email });
  if (user) {
    return res.json({ msg: "User already exist!" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await userModel.create({
    email,
    name,
    password: hashedPassword,
  });
  res.json({ msg: "user registered successfully!" });
} catch(err){
  console.error("This is the errrrrr====> ", err);
}
};



//! LOGIN USER


const loginUser = async (req, res) => {
  const { email, password } = req.body;


  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).send({msg: "email does not exist in database"})
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({msg: "invalid - password"})
  }
  
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return res.json({ token, userId: user._id });
};

export { loginUser, registerUser };
