import express from "express";
import { getContacts, getContact, createContact, updateContact, deleteContact } from "../controllers/contact-controllers.js"
import { protect } from "../middlewares/authMiddleware.js";

const contactRouter = express.Router()

contactRouter.get("/", protect, getContacts)
contactRouter.post("/new-contact", protect, createContact)
contactRouter.route("/:id").get(protect,getContact).put(protect,updateContact).delete(protect,deleteContact)

export default contactRouter;