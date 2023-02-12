const mongoose = require('mongoose')
const User = require("../Models/Schema")
const { getUsersOpts , getUserOpts , signInUserOpts,loginNewUserOpts,updateUserOpts,deleteUserOpts} = require('./handler')
const { getfolderOpts, addfolderOpts, deletefolderOpts, datebeforeOpts, dateafterOpts, datesameOpts, favouritefolderOpts } = require('./handler')
const { getURLs, postURL, deleteURL } = require('../Controller/urlcontroller')



function userRoute(fastify, options, done) {
    ////////////Login page//////////
    fastify.post('/login', loginNewUserOpts)

    /////////////////Sign In///////////////
    fastify.post('/SignIn', signInUserOpts)

    ///////////////USER ROUTES////////////////
    fastify.get('/allUsers', getUsersOpts)

    fastify.get('/user/:phone', getUserOpts)


    //Update Request
    fastify.put('/updateUser/:phone', updateUserOpts)

    //Delete request
    fastify.delete('/deleteUser/:phone', deleteUserOpts)

    /////////////////////////////END USER ROUTES//////////////

    ///////////////////////GROUP ROUTES///////////////

    fastify.get('/:phoneno', getfolderOpts)
    fastify.post('/:phone/addfolder', addfolderOpts)
    fastify.delete('/:phone/:name', deletefolderOpts)
    fastify.get('/:phone/favourite', favouritefolderOpts)
    /////////////////////////URL Routes////////////

    fastify.get('/:phone/:name/allURL', getURLs)
    fastify.post('/:phone/:groupname/newURL', postURL)
    fastify.delete('/:phone/:groupname/deleteURL/:url', deleteURL)
    //////////////////////////////////////////////////////////////////////

    fastify.post('/:phone/history/before', datebeforeOpts)
    fastify.post('/:phone/history/after', dateafterOpts)
    fastify.post('/:phone/history/same', datesameOpts)

    done()
}

module.exports = userRoute