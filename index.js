require('dotenv').config();
const mongoose=require("mongoose");
const {MongoClient}= require("mongodb");
const uri=process.env.DATABASE
const moment=require("moment")
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



// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

// // Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  // Server is now listening on ${address}
})