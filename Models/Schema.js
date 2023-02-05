const mongoose = require("mongoose")
const {ObjectId}=mongoose.Schema

const urlSchema=new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
    foldername:String,
    urls:[String]
})

const Url=mongoose.model("url",urlSchema)

const userSchema=new mongoose.Schema({
    name:String,
     phoneno: {type:Number,
                unique:true,
                required:true
            },
     folder:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'url'
     }]
     
})



const User=mongoose.model("user",userSchema)

module.exports ={ User,Url}