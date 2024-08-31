import mongoose, { Schema, model } from "mongoose";

const contactSchema = new Schema({
  name: { type: String, required: true },
  profession: { type: String, required: false  },
  image: { type: String, required: false },
  email: { type: String, required: false },
  social_media_link: { type: String, required: false },
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