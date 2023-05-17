import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  name: { type: String },
  profession: { type: String },
  // location: { type: String },
  // company: { type: String },
},{
  timestamps: true,
})

const contactModel = model("Contact", contactSchema)
export default contactModel