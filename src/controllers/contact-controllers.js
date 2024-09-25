import contactModel from "../models/contact-model.js";

//GET ALL CONTACTS
const getContacts = async(req,res)=>{
  try {
    const contacts = await contactModel.find({ user: req.user.id })
    return res.json(contacts)
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: error.message})
  }
}
//GET A CONTACT
const getContact = async(req,res)=>{
  try {
    const contact = await contactModel.findById(req.params.id)
    res.json(contact)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: error.message})
  }
}
//CREATE A CONTACT
const createContact = async(req, res)=>{
  const { name, profession, image, email, social_media_link } = req.body
  try {
    if( !name ){
      return res.json({ error: "All fields must be filled!"})
    }
    const contact = await contactModel.create({ name, profession, image, email, social_media_link, user: req.user._id })
    res.json(contact)
  } catch (error) {
    // res.json({error: error})
    res.status(500).json({message: error.message})
  }
}
//UPDATE A CONTACT
const updateContact = async (req,res)=>{
  const { id } = req.params
  const { name } = req.body
  try {
    if(!name) return res.status(401).json("Please fill the name field")
    const updatedContact = await contactModel.findByIdAndUpdate(id, req.body)
    res.json(updatedContact)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: error.message})
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
    res.status(500).json({message: error.message})
  }
}

export { getContacts, getContact, createContact, updateContact, deleteContact }