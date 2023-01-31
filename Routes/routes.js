const { getUser,postUser,updateUser, deleteUser}=require('../Controller/controller')
const mongoose=require('mongoose')
const User=require("../Models/Schema")


function userRoute(fastify,options,done){
    fastify.get('/allUsers',getUserOpts)


    
    fastify.get('/user/:id',async (req,reply)=>{
        const id = req.params.id
        const user = await User.findById(id)
        reply.send(user)
    })
    //Post request


    fastify.post('/addUser',postUserOPts)

    //Put 
    fastify.put('/updateUser/:id',updateUserOPts)

    //Delete request
    fastify.delete('/deleteUser/:id',deleteUserOPts)

    done()
}

const getUserOpts={
    schema:{
        response:{
            200:{
                type:'array',
                items:{
                    type:'object',
                    properties:{
                       //id:{type:'string'},
                        name:{type:'string'}
                    }
                }
            }
        }
    },
    handler: getUser,
}

const postUserOPts={
    schema:{
        response:{
            201:{
               // type:'array'
                    type:'object',
                    properties:{
                       //id:{type:'string'},
                        name:{type:'string'},
                        phoneno:{type:'integer'}
                    }
                
            }
        }
    },
    handler: postUser,
}

const updateUserOPts={
    schema:{
        response:{
            200:{
               // type:'array'
                    type:'object',
                    properties:{
                       //id:{type:'string'},
                        name:{type:'string'},
                        phoneno:{type:'integer'}
                    }
                
            }
        }
    },
    handler: updateUser,
}

const deleteUserOPts={
    schema:{
        response:{
            200:{
               // type:'array'
                    type:'object',
                    properties:{
                       //id:{type:'string'},
                        message:{type:'string'}
                    }
                
            }
        }
    },
    handler: deleteUser,
}
module.exports=userRoute