import express from "express";
import * as control from "../controllers/contact-controllers.js"

const contactRouter = express.Router()

contactRouter.get("/", control.getContacts)
contactRouter.get("/new-contact", control.createContact)
// contactRouter.get("/:id", control.getContact).put(updateContact).delete(deleteContact)

export default contactRouter;