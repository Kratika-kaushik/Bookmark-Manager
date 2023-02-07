const { getUser, postUser ,updateUser, deleteUser}=require('../Controller/usercontroller')
const {getfolder,addfolder,deletefolder,datebefore,dateafter,datesame}=require('../Controller/foldercontroller')
const {getURLs,postURL,deleteURL}=require('../Controller/urlcontroller')
const mongoose=require('mongoose')
const User=require("../Models/Schema")


function userRoute(fastify,options,done){
    
    ///////////////USER ROUTES////////////////
    fastify.get('/allUsers',getUser)

    fastify.get('/user/:id',async (req,reply)=>{
        const id = req.params.id
        const user = await User.findById(id)
        reply.send(user)
    })
    //Post request


    fastify.post('/addUser',postUser)

    //Update Request
    fastify.put('/updateUser/:id',updateUser)

    //Delete request
    fastify.delete('/deleteUser/:id',deleteUser)

    /////////////////////////////END USER ROUTES//////////////

    ///////////////////////GROUP ROUTES///////////////

    fastify.get('/:phoneno',getfolder)
    fastify.post('/:phone/addfolder',addfolder)
    fastify.delete('/:phone/:name',deletefolder)

    /////////////////////////URL Routes////////////

    fastify.get('/:phone/:name/allURL',getURLs)
    fastify.post('/:phone/:groupname/newURL',postURL)
    fastify.delete('/:phone/:groupname/deleteURL/:url',deleteURL)
//////////////////////////////////////////////////////////////////////

fastify.post('/:phone/history/before',datebefore)
fastify.post('/:phone/history/after',dateafter)
fastify.post('/:phone/history/between',datesame)
    done()
}


module.exports=userRoute