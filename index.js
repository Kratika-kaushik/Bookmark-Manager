const mongoose=require("mongoose");
const {MongoClient}= require("mongodb");
const uri='mongodb+srv://kratika-mtalkz:kratika-mtalkz@cluster0.4o3dgcq.mongodb.net/BookmarkManagerDB?retryWrites=true&w=majority';

const fastify=require('fastify')({logger:true})
fastify.register(require('./Routes/routes'))
const client =new MongoClient(uri);



async function connect(){
    try{
        mongoose.set("strictQuery",false)
        mongoose.connect(uri,{useNewUrlParser : true})
        console.log("connected to mongodb");
        
    }catch(error){
        console.error(error);
    }
}
connect();

const start=async()=>{
    try{
        await fastify.listen({port:5000})
        
    }catch(error){
        fastify.log.error(error)
        process.exit(1)
    }
}
start();

