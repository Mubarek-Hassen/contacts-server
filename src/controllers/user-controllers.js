import userModel from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// REGISTER USER
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  let errors = {}
  if(!name) errors.name = "Name field cannot be empty!"
  if(!email) errors.email = "Email field cannot be empty!"
  if(!password) errors.password = "Password field cannot be empty!"

  if(!name || !email || !password){
    return res.status(400).json(errors)
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
  let errors = {};
  if(!email) errors.email = "Email field cannot be empty."
  if(!password) errors.password = "Password field cannot be empty."
  try {
    if(!email || !password){
      return res.json(errors)
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      errors.email = "There is no user registered for this email."
      // return res.status(401).send({msg: "email does not exist in database"})
      return res.status(404).json(errors)
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      errors.password = "Invalid credentials."
      // return res.status(401).json({msg: "invalid - password"})
      return res.status(401).json(errors)
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token, userId: user._id });
  } catch (error) {
    console.error("This is a login error===> ", error)
  }

};

export { loginUser, registerUser };
