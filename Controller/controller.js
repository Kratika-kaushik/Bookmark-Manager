const mongoose=require("mongoose")
const User=require("../Models/Schema")



const getUser= async (req, reply) => {
    try {
      const res=await User.find()
      reply.send(res)
    } catch (err) {
      console.error(err)
    }
}
  
const postUser=async(req,reply)=>{
    const user= new User(req.body)
     user.save()
}

const updateUser=async (req,reply)=>{
    try {
        const id = req.params.id
        const user = req.body
        const { ...updateData } = user
        const update = await User.findByIdAndUpdate(id, updateData, { new: true })
        reply.send(update)
      } catch (err) {
    console.error(error)
      }
    
}

const deleteUser= async (req,reply)=>{
    const id = req.params.id
    const user = await User.findByIdAndRemove(id)

    reply.send({message:`User ${id} has been deleted`})
}

module.exports={getUser,postUser, deleteUser,updateUser}