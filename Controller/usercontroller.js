const mongoose=require("mongoose")
const User=require("../Models/Schema")


////////////////User CRUD//////////////////
const getUser= async (req, reply) => {
    try {
      const res=await User.find()
      reply.send(res)
    } catch (err) {
      console.error(err)
    }
}
  
const postUser=async(req,reply)=>{
    try{
        const {phoneno} =req.body;
    
        if(!phoneno){
            reply.status(404).send('Please enter a phone number');

            // reply.send.status(301).json({"test":"Please enter a phone number"})
        }else{

            try{
                const user= await User.findOne({"phoneno":phoneno})
                if (user == null){
                    const u=new User(req.body)
                
                    u.save()
                    return
            }else{

                return reply.status(300).send('Already exists');
            }
                
            }
            catch(error){

                reply.status(404).send('Not Found');
            }
           
        }

        
    }catch(error){
        console.log("outer catch")
        reply.send(error)
    }
  
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

///////////////////////////////////////////////////


const insertBookmark= async(req,reply)=>{
    const phone=req.params.phoneno
    const url=req.body
    const{...updateData}=url
    const addedbookmark= await User.find({phoneno:phone})
}

module.exports={getUser,postUser, deleteUser,updateUser}