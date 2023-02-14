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
           
    let m=moment()
    const varr=m.format("D/M/YYYY");
    const ui=await User.findOne({phone:phone})
    const id=ui._id
        const obj=new Url({name:name,createdAT:varr,favourite:req.body.favourite,user:id})
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

const datebefore=async (req,res)=>{
    const phone=req.params.phone
    const u=await User.findOne({phone:phone}).populate({path:'folder' ,model:"url"})
    const varr=u.folder.filter((item)=>{
        console.log(moment(item.createdAT).format("DD-MM-YYYY"))
        return (moment(item.createdAT).format("DD-MM-YYYY") <= moment(req.body.date).format("DD-MM-YYYY"))
    })

res.send(varr)

}

const dateafter=async (req,res)=>{
    const phone=req.params.phone
        const u=await User.findOne({phone:phone}).populate({path:'folder' ,model:"url"})
const varr=u.folder.filter((item)=>{
   return moment(item.createdAT).format("DD-MM-YYYY") > moment(req.body.date).format("DD-MM-YYYY")
})
//console.log(u.folder)
res.send(varr)

}

const datesame=async (req,res)=>{
    const phone=req.params.phone
        const u=await User.findOne({phone:phone}).populate({path:'folder' ,model:"url"})
const varr=u.folder.filter((item)=>{
   return moment(item.createdAT).format("DD-MM-YYYY") == moment(req.body.date).format("DD-MM-YYYY")
})

res.send(varr)

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


module.exports={getfolder,addfolder,deletefolder,datebefore,dateafter,datesame,favouritefolder}

