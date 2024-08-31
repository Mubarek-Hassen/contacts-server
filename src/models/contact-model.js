import mongoose, { Schema, model } from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true },
  profession: { type: String },
  image: { type: String },
  email: { type: String },
  social_media_link: { type: String },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
},{
  timestamps: true,
})

const contactModel = model("Contact", contactSchema)
export default contactModel