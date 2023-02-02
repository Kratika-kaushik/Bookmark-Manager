const mongoose=require("mongoose")
const User=require('../Models/Schema')

const getfolder=async(req,res)=>{
    try{
    
        const  phoneno=req.params.phoneno;
    
     const u=await User.findOne({phoneno:phoneno})

     let i=[]
     u.folder.forEach((item)=>{
    i.push(item.name)
      })
      res.send(i)
          
    }catch(err){
        console.error(err)
    }
}



const updatefolder=async(req,res)=>{
    try{
    
        const  phone=req.params.phone;
        const name=req.params.updatefolder;
 
        const updatedname=req.body.name;
       // console.log(updatedname)
       const data=await User.findOne({phoneno:phone}) 
       data.folder.map((item)=>{
        if(item.name==name){
            item.name =updatedname
        }
       })
       //console.log(data)
       res.send(data)
       data.save()
       // res.send(u)
        

    }catch(err){
        console.error(err)
    }
}

const deletefolder=async(req,res)=>{
    try{
    
        const  phoneno=req.params.phone;
        const name=req.params.name;

    //     const u=await User.findOne({phoneno:phoneno})
    //    const itemm= u.folder.filter((item)=>(item.name!=name))

      // User.findOneAndUpdate({ phoneno:phoneno }, { $pull: { event: { name: name } } }, { new: true });

//console.log(itemm)
const updatedUser = await User.findOneAndUpdate(

    phoneno,

    { $pull: { "folder.$.name": name} },

    { new: true }

  );

  res.send({ updatedUser });



    }catch(err){
        console.error(err)
    }
}

module.exports={getfolder,updatefolder,deletefolder}

