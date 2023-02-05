const mongoose=require("mongoose")
const {User, Url}=require('../Models/Schema')

const getfolder=async(req,res)=>{
    try{
    const phone=req.params.phoneno
   const u= await User.findOne({phoneno:phone}).populate({path:'folder' ,model:"url"})
    res.send(u)
 
    }catch(err){
        console.error(err)
    }
}



const addfolder=async(req,res)=>{
    try{
    
        const  phone=req.params.phone;
        const {foldername}=req.body;
  
        const obj=new Url(req.body)
      
       const ui=await User.findOne({phoneno:phone})
       const id=ui._id
       obj.user=id
       obj.save()
       const u=await User.findOneAndUpdate({phoneno:phone},{$push:{folder:obj._id}})
    u.save()
       
    }catch(err){
        console.error(err)
    }
}

const deletefolder=async(req,res)=>{
    try{
    
        const  phoneno=req.params.phone;
        const name=req.params.name;
        const u=await User.findOne({phoneno:phoneno})
const id=u._id

 await Url.findOneAndDelete({user:id, foldername:name})


    }catch(err){
        console.error(err)
    }
}

module.exports={getfolder,addfolder,deletefolder}

