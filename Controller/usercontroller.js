const mongoose=require("mongoose")
const {User,Url}=require("../Models/Schema")
const bcrypt=require("bcryptjs")
//const json=require("jsonwebtoken")

////////////////User CRUD//////////////////
const getUser= async (req, reply) => {
    try {
      const u= await User.find().populate({path:'folder' ,model:"url"})
      reply.send(u)
    } catch (err) {
      console.error(err)
    }
}
  
const postUser=async(req,reply)=>{
    try{
        const {name,phoneno,password} =req.body;

        if(!phoneno){
            reply.status(404).send('Please enter a phone number');
        }else{

            try{
                const user= await User.findOne({phoneno:phoneno})
              
            
                if (user == null){

                    const u=new User({name,phoneno,password})
            
                   await u.save()
                    return
            }else{
            
                const isMatch=await bcrypt.compare(password,user.password);
                console.log(isMatch)
                if(!isMatch){
                
                 reply.status(300).send('Invalid ');}
                else {
                 reply.status(300).send('Login successful');
                }
              // const token=await u.generateAuthToken()
            
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
        console.log(user)
       const u=await User.findOneAndUpdate({phoneno:id},req.body,{new:true})
       
        reply.send(u)
      } catch (err) {
    console.error(error)
      }
    
}

const deleteUser= async (req,reply)=>{
    const id = req.params.id
    const user = await User.findOneAndDelete(
        {phoneno:id}
    )

    reply.send({message:`User ${id} has been deleted`})
}

///////////////////////////////////////////////////

module.exports={getUser,postUser, deleteUser,updateUser}