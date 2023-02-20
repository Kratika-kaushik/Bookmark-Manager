const mongoose=require("mongoose")
const {User, Url}=require('../Models/Schema')
const moment=require("moment")
const getfolder=async(req,res)=>{
    try{
    const phone=req.params.phone
   const u= await User.findOne({phone:phone}).populate({path:'folder' ,model:"url"})
    res.status(200).send(u)
 
    }catch(err){
        console.error(err)
    }
}



const addfolder=async(req,res)=>{
    try{
    
        const  phone=req.params.phone;
        const name=req.body.name;
           
    // let m=moment()
    // const varr=m.format("D/M/YYYY");
    const ui=await User.findOne({phone:phone})
    const id=ui._id
        const obj=new Url({name:name,createdAT:new Date(),favourite:req.body.favourite,user:id})
       obj.save()
   const u= await User.findOneAndUpdate({phone:phone},{$push:{folder:obj._id}})
    //u.save()
       res.status(201).send("Added Successfully")
    }catch(err){
        console.error(err)
    }
}

const deletefolder=async(req,res)=>{
    try{
    
        const  phone=req.params.phone;
        const name=req.params.name;
        const u=await User.findOne({phone:phone})
const id=u._id

 const obj=await  Url.findOneAndDelete({user:id, name:name})
 await User.findOneAndUpdate({phone:phone},{$pull:{folder:obj._id}})
res.send("Deleted successfully")

    }catch(err){
        console.error(err)
    }
}


const date=async (req,res)=>{
    const phone=req.params.phone
     let start=req.query.start
     let end=req.query.end
   
    if(start!=null && end!=null){
        start=new Date(req.query.start)
        end=new Date(req.query.end)
        if(start>end){
            res.send("Please enter a valid date")
        }else{
            const u=await User.findOne({phone:phone}).populate({path:'folder' ,model:"url"})
            const varr=u.folder.filter((item)=>{
            
                 return (item.createdAT>=start && item.createdAT<end)
            })
            res.send(varr)
        }
    }

    if(start!=null && end==null){
        start=new Date(req.query.start)
            const u=await User.findOne({phone:phone}).populate({path:'folder' ,model:"url"})
            const varr=u.folder.filter((item)=>{
            
                 return (item.createdAT>=start)
            })
            res.send(varr)
        
    }

    if(start==null && end!=null){
        end=new Date(req.query.end)
            const u=await User.findOne({phone:phone}).populate({path:'folder' ,model:"url"})
            const varr=u.folder.filter((item)=>{       
                 return (item.createdAT<end)
            })
            res.send(varr)    
    }

    
    if(start==null && end==null){
        start=new Date(req.query.end)
            const u=await User.findOne({phone:phone}).populate({path:'folder' ,model:"url"})           
            res.send(u.folder)       
    }

}

const favouritefolder=async (req,res)=>{
    const phone=req.params.phone
        const u=await User.findOne({phone:phone}).populate({path:'folder' ,model:"url"})
const varr=u.folder.filter((item)=>{
   return item.favourite
})
console.log(varr);
res.status(200).send(varr)

}


module.exports={getfolder,addfolder,deletefolder,date,favouritefolder}

