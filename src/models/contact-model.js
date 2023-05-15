import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  name: {
    first: { type: String },
    last: { type: String }
  },
  profession: { type: String },
  location: { type: String },
  company: { type: String },
  
})