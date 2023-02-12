const { getUser, getSingleUser,updateUser, deleteUser, loginNewUser, signInUser } = require('../Controller/usercontroller')
const { getfolder, addfolder, deletefolder, datebefore, dateafter, datesame, favouritefolder } = require('../Controller/foldercontroller')

const USER={
    
        type: 'object',
        properties: {
            name: { type: 'string' },
            phoneno: { type: 'number' },
        }

}
const FOLDER={
    type:'object',
    properties:{
        name:{type:'string'},
        phoneno:{type:'number'},
        folder:{type:'array'}
    }
}

const getUsersOpts = {
    schema: {
        summary: 'Get all Users',
        response: {
            200: {
                type: 'array',
                items:USER
            },
        },
        tags:['Users'],
    },
  
    handler: getUser
}

const getUserOpts = {
    schema: {
        summary: 'Get a single User',
       params:{
        description: 'User phone number',
        type: 'object',
        properties: {
            phone: { type: 'number' } 
        }
       },
        response: {
            200:  USER,
        },
        tags:['Users'],
    },
  
    handler: getSingleUser
}

const signInUserOpts = {
    schema: {
        summary: 'Sign In User',
        body: {
            type: 'object',
            required: ['name', 'phoneno','password'],
            properties: {
                name: {
                    type: 'string',
                    description: 'Enter the name of the item to add'
                },
                phoneno: {
                    type: 'string',
                    description: 'Enter the mobile number of the item to add'
                },
                password:{
                    type:'string',
                    description:'Enter the password'
                }
            }
        },
        response: {
            400:  USER,
        },
        tags:['Users'],
    },
  
    handler: signInUser
}

const loginNewUserOpts = {
    schema: {
        summary: 'Login In User',
        body: {
            type: 'object',
            required: ['name', 'phoneno','password'],
            properties: {
                name: {
                    type: 'string',
                    description: 'Enter the name of the item to add'
                },
                phoneno: {
                    type: 'string',
                    description: 'Enter the mobile number of the item to add'
                },
                password:{
                    type:'string',
                    description:'Enter the password'
                }
            }
        },
        response: {
            300:  USER,
        },
        tags:['Users'],
    },
  
    handler: loginNewUser
}

const updateUserOpts = {
    schema: {
        summary: 'Update a specified User',
        params: {
            description: 'User phone number',
            type: 'object',
            properties: {
                phone: { type: 'number' } 
            }
        },
        body: {
            description: 'Updating a new user',
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    phone: { type: 'string' },
                    password: { type: 'string' }
                }
        },
        response: {
            200:  USER,
        },
        tags:['Users'],
    },
  
    handler: updateUser
}

const deleteUserOpts = {
    schema: {
        summary: 'Delete a User',
        params: {
            description: '  User phonenumber',
            type: 'object',
            properties: {
                phone: { type: 'number' } 
            }
        },
        response: {
            204:   {type: 'string',
           default:'no content'
        },},
        tags:['Users'],
    },
  
    handler: deleteUser
}

// `const getfolderOpts={

// } 
// const addfolderOpts={

// }
// const deletefolderOpts={

// }
// const favouritefolderOpts={

// }
// const dateafterOpts={

// }
// const datebeforeOpts={

// }
// const datesameOpts={

// }`

module.exports={getUsersOpts,getUserOpts,signInUserOpts,deleteUserOpts,updateUserOpts,loginNewUserOpts,
   getfolderOpts,addfolderOpts,deletefolderOpts,favouritefolderOpts,dateafterOpts,datebeforeOpts,datesameOpts}