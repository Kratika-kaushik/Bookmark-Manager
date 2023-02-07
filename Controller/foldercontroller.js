const mongoose=require("mongoose")
const {User, Url}=require('../Models/Schema')
const moment=require("moment")
const getfolder=async(req,res)=>{
    try{
    const phone=req.params.phoneno
    const data=await Url.find()
    console.log(data)
   const u= await User.findOne({phoneno:phone}).populate({path:'folder' ,model:"url"})
    res.send(u)
 
    }catch(err){
        console.error(err)
    }
}



const addfolder=async(req,res)=>{
    try{
    
        const  phone=req.params.phone;
        const foldername=req.body.foldername;
           
    let m=moment()
    const varr=m.format("D/M/YYYY");

        const obj=new Url({foldername:foldername,createdAT:varr,favourite:req.body.favourite})
      
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

const datebefore=async (req,res)=>{
    try{
        const phone=req.params.phone
        const u=await User.findOne({phoneno:phone}).populate({path:'folder' ,model:"url"})
const varr=u.folder.filter((item)=>{
   return moment(item.createdAT).format("DD-MM-YYYY") < moment(req.body.date).format("DD-MM-YYYY")
})
res.send(varr)
    }catch(err){
        console.log(err)
    }
}

const dateafter=async (req,res)=>{
    const phone=req.params.phone
        const u=await User.findOne({phoneno:phone}).populate({path:'folder' ,model:"url"})
const varr=u.folder.filter((item)=>{
   return moment(item.createdAT).format("DD-MM-YYYY") > moment(req.body.date).format("DD-MM-YYYY")
})
//console.log(u.folder)
res.send(varr)

}

const datesame=async (req,res)=>{
    const phone=req.params.phone
        const u=await User.findOne({phoneno:phone}).populate({path:'folder' ,model:"url"})
const varr=u.folder.filter((item)=>{
   return moment(item.createdAT).format("DD-MM-YYYY") == moment(req.body.date).format("DD-MM-YYYY")
})

res.send(varr)

}

const favouritefolder=async (req,res)=>{
    const phone=req.params.phone
        const u=await User.findOne({phoneno:phone}).populate({path:'folder' ,model:"url"})
const varr=u.folder.filter((item)=>{
   return item.favourite
})
res.send(varr)

}


module.exports={getfolder,addfolder,deletefolder,datebefore,dateafter,datesame,favouritefolder}

