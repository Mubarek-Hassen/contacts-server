import express from "express";
import { getContacts, getContact, createContact, } from "../controllers/contact-controllers.js"

const contactRouter = express.Router()

contactRouter.get("/", getContacts)
contactRouter.post("/new-contact", createContact)
contactRouter.get("/:id", getContact)
// .put(updateContact).delete(deleteContact)

export default contactRouter;