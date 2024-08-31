import contactModel from "../models/contact-model.js";

//GET ALL CONTACTS
const getContacts = async(req,res)=>{
  try {
    const contacts = await contactModel.find({ user: req.user.id })
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
    res.json({msg: error})
  }
}
//CREATE A CONTACT
const createContact = async(req, res)=>{
  const { name, profession, image, email, social_media_link } = req.body
  try {
    if( !name ){
      return res.json({ msg: "All fields must be filled!"})
    }
    const contact = await contactModel.create({ name, profession, image, email, social_media_link, user: req.user._id })
    res.json(contact)
  } catch (error) {
    res.json(error)
  }
}
//UPDATE A CONTACT
const updateContact = async (req,res)=>{
  const { name, profession } = req.body;
  const { id } = req.params
  try {
    const updatedContact = await contactModel.findByIdAndUpdate(id, { name, profession, image, email, social_media_link, })
    res.json(updatedContact)
  } catch (error) {
    console.error(error)
  }
}

//DELETE A CONTACT
const deleteContact = async(req,res)=>{
  const { id } = req.params;
  console.log(id)
  try {
    const deletedCard = await contactModel.findByIdAndRemove(id)
    res.send(id)
  } catch (error) {
    console.error(error)
  }
}

export { getContacts, getContact, createContact, updateContact, deleteContact }