import express from "express";

const contactRouter = express.Router()

contactRouter.get("/", getContacts)
contactRouter.get("/new-contact", createContact)
contactRouter.get("/:id", getContact).put(updateContact).delete(deleteContact)

export default contactRouter;