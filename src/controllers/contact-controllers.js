import contactModel from "../models/contact-model.js";

//GET ALL CONTACTS
const getContacts = async(req,res)=>{
  try {
    const contacts = await contactModel.find({})
    res.json(contacts)
  } catch (error) {
    console.error(error)
  }
}
//GET A CONTACT
const getContact = async(req,res)=>{
  try {
    const contact = await contactModel.findById(req.params.id)
    res.json(contact)
  } catch (error) {
    console.error(error)
  }
}
//CREATE A CONTACT
const createContact = async(req, res)=>{
  const { name, profession } = req.body
  try {
    if( !name || !profession){
      return res.json({ msg: "All fields must be filled!"})
    }
    const contact = await contactModel.create({ name, profession })
    res.json(contact)
  } catch (error) {
    console.error(error)
  }
}

export { getContacts, getContact, createContact }