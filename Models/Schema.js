const mongoose = require("mongoose")
const userSchema=new mongoose.Schema({
    name:String,
     phoneno: {type:Number,
                unique:true,
                required:true
            },
     groups:[
        {
            name:String,
            url:[{type:String}]
        }
     ]
})

const User=mongoose.model("user",userSchema)
module.exports = User