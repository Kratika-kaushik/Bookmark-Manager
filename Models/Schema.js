require('dotenv').config();
const mongoose = require("mongoose")
const moment=require("moment")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const {ObjectId}=mongoose.Schema


const urlSchema=new mongoose.Schema({
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
    foldername:String,
    urls:[String],
    createdAT:{
        type: String
    },
    favourite:Boolean
}

)

const Url=mongoose.model("url",urlSchema)

const userSchema=new mongoose.Schema({
    name:String,
     phoneno: {type:Number,
                unique:true,
                required:true
            },
    password:{type:String,
         required:true},
     folder:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'url'
     }],
     tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
     ]
})

//BCRYPT
userSchema.pre('save',async function(next){
    
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
       
    }
    next();
})

//JWTTOKEN
userSchema.methods.generateAuthToken= async function(){
    try{
let token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)   //SECRET_KEY is 32 character long string
this.tokens=this.tokens.concat({token:token});
await this.save();
return token;
    }catch(err){
        console.log(err)
    }
}
const User=mongoose.model("user",userSchema)
module.exports ={ User,Url}
