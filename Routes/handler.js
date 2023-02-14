const mongoose = require("mongoose")
const { getUser, getSingleUser, updateUser, deleteUser, loginNewUser, signInUser } = require('../Controller/usercontroller')
const { getfolder, addfolder, deletefolder, datebefore, dateafter, datesame, favouritefolder } = require('../Controller/foldercontroller')
const {getURLs,postURL,deleteURL}=require('../Controller/urlcontroller')
const USER = {

    type: 'object',
    properties: {
        name: { type: 'string' },
        phone: { type: 'number' },
    }

}
const FOLDER = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        //phone:{type:'number'},
        urls: { type: 'array' }
    }
}

const getUsersOpts = {
    schema: {
        summary: 'Get all Users',
        response: {
            200: {
                description: "OK",
                type: 'array',
                items: USER
            },
        },
        tags: ['Users'],
    },

    handler: getUser
}

const getUserOpts = {
    schema: {
        summary: 'Get a single User',
        params: {
            description: 'User phone number',
            type: 'object',
            properties: {
                phone: { type: 'number' }
            }
        },
        response: {
            200:  {description: "OK",
            type: 'object',
            properties: {
                name: { type: 'string' },
                phone: { type: 'number' },
                folder: {
                    type: 'array',
                    items: FOLDER
                }
            },
        },},
        tags: ['Users'],
    },

    handler: getSingleUser
}

const signInUserOpts = {
    schema: {
        summary: 'Sign In User',
        body: {
            type: 'object',
            required: ['name', 'phone', 'password'],
            properties: {
                name: {
                    type: 'string',
                    description: 'Enter the name of the item to add'
                },
                phone: {
                    type: 'number',
                    description: 'Enter the mobile number of the item to add'
                },
                password: {
                    type: 'string',
                    description: 'Enter the password'
                }
            }
        },
        response: {
            400: {
                description: "Signed Up successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    example: 'Signed Up',
                                },
                            },
                        },
                    },
                },
            },
        },
        tags: ['Users'],
    },

    handler: signInUser
}

const loginNewUserOpts = {
    schema: {
        summary: 'Login In User',
        body: {
            type: 'object',
            required: ['name', 'phone', 'password'],
            properties: {
                name: {
                    type: 'string',
                    description: 'Enter the name of the item to add'
                },
                phone: {
                    type: 'number',
                    description: 'Enter the mobile number of the item to add'
                },
                password: {
                    type: 'string',
                    description: 'Enter the password'
                }
            }
        },
        response: {
            300: {
                description: "Logged In successfully",
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    example: 'Logged in',
                                },
                            },
                        },
                    },
                },
            },
        },
        tags: ['Users'],
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
                phone: { type: 'number' },
                password: { type: 'string' }
            }
        },
        response: {
            200: USER,
        },
        tags: ['Users'],
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
            204: {
                description: "Deleted successfully",
                type: 'string',
                default: 'no content'
            },
        },
        tags: ['Users'],
    },

    handler: deleteUser
}

const getfolderOpts = {
    schema: {
        summary: 'Get all folder',
        params: {
            description: 'User phone number',
            type: 'object',
            properties: {
                phone: { type: 'number' }
            }
        },
        response: {
            200: {

                description: "OK",
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    phone: { type: 'number' },
                    folder: {
                        type: 'array',
                        items: FOLDER
                    }
                }
            },
        },
        tags: ['Folders'],
    },

    handler: getfolder
}
const addfolderOpts = {
    schema: {
        summary: 'Add folder to a User',
        params: {
            description: '  User phonenumber',
            type: 'object',
            properties: {
                phone: { type: 'number' }
            }
        },
        body: {
            type: 'object',
            required: ['name', 'favourite'],
            properties: {
                name: {
                    type: 'string',
                    description: 'Enter the name of the folder'
                },
                favourite: {
                    type: 'boolean',
                    description: 'Enter the favourite field as true or false'
                }
            }
        },
        response: {
            201: {
                description: "Added folder successfully",
                type: 'string',
                default: 'no content',
            },
        },
        tags: ['Folders'],
    },

    handler: addfolder
}
const deletefolderOpts = {
    schema: {
        summary: 'Delete a Folder',
        params: {
            description: '  User phonenumber and folder name',
            type: 'object',
            required: ['phone', 'name'],
            properties: {
                phone: { type: 'number' },
                name: { type: 'string' }
            }
        },
        response: {
            200: {
                type: 'string',
                default: 'no content'
            },
        },
        tags: ['Folders'],
    },

    handler: deletefolder
}
const favouritefolderOpts = {
    schema: {
        summary: 'Favourite folder',
        params: {
            description: '  User phonenumber',
            type: 'object',
            properties: {
                phone: { type: 'number' }
            }
        },
        response: {
            200: {
                description: "OK",
                type: 'array',

                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        urls: { type: 'array' },
                        createdAt: { type: 'string' }
                    }
                }
            },
        },
        tags: ['Folders'],
    },

    handler: favouritefolder
}
const dateafterOpts = {
    schema: {
        summary: 'Folder created after a particular date',
        params: {
            description: '  User phonenumber',
            type: 'object',
            properties: {
                phone: { type: 'number' }
            }
        },
        body: {
        
                type: 'object',
                required: ['date'],
                properties: {
                    date: {
                        type: 'string',
                        description: 'Enter the date'
                    }
                },
            
        },
        response: {
            200: {
                description: "OK",
                type: 'array',

                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        urls: { type: 'array' },
                        createdAt: { type: 'string' }
                    }
                }
            },
        },
        tags: ['Folders'],
    },

    handler: dateafter
}
const datebeforeOpts = {
    schema: {
        summary: 'Folder created before a particular date',
        params: {
            description: '  User phonenumber',
            type: 'object',
            properties: {
                phone: { type: 'number' }
            },
        },
        body: {
            type: 'object',
            required: ['date'],
            properties: {
                date: {
                    type: 'string',
                    description: 'Enter the date'
                }
            },
        },
        response: {
            200: {
                description: "OK",
                type: 'array',

                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        urls: { type: 'array' },
                        createdAt: { type: 'string' }
                    }
                }
            },
        },
        tags: ['Folders'],
    },

    handler: datebefore
}
const datesameOpts = {
    schema: {
        summary: 'Folder created on the same date',
        params: {
            description: '  User phonenumber',
            type: 'object',
            properties: {
                phone: { type: 'number' }
            }
        },
        body: {
            type: 'object',
            required: ['date'],
            properties: {
                date: {
                    type: 'string',
                    description: 'Enter the date'
                }
            },
        },
        response: {
            200: {
                description: "OK",
                type: 'array',

                items: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        urls: { type: 'array' },
                        createdAt: { type: 'string' }
                    }
                }
            },
        },
        tags: ['Folders'],
    },

    handler: datesame
}
const getURLsOpts={
    schema: {
        summary: 'Get all URLs',
        params: {
            description: 'User phone number and folder name',
            type: 'object',
            properties: {
                phone: { type: 'number' },
                name:{type:'string'}
            }
        },
        response: {
            200: {

                description: "OK",
                type: 'array',
                properties: {
                    name: { type: 'string' },
                }
            },
        },
        tags: ['URLs'],
},
handler:getURLs,
}

const postURLOpts={
    schema: {
        summary: 'Add URL to a Folder',
        params: {
            description: '  User phonenumber and folder name',
            type: 'object',
            properties: {
                phone: { type: 'number' },
                groupname:{type:'string'}
            }
        },
        body: {
            type: 'object',
            required: ['urls'],
            properties: {
                urls: {
                    type: 'string',
                    description: 'Enter the name of the url'
                }
            }
        },
        response: {
            200: {
                description: "Added url successfully",
                type: 'string',
                default: 'no content',
            },
        },
        tags: ['URLs'],
    },

    handler: postURL
}

const deleteURLOpts={
    schema: {
        summary: 'Delete a URL',
        params: {
            description: '  User phonenumber and folder and url name',
            type: 'object',
            required: ['phone', 'name','url'],
            properties: {
                phone: { type: 'number' },
                name: { type: 'string' },
                url:{type:'string'}
            }
        },
        response: {
            200: {
                type: 'string',
                default: 'no content'
            },
        },
        tags: ['URLs'],
    },

    handler: deleteURL
}

module.exports = {
    getUsersOpts, getUserOpts, signInUserOpts, deleteUserOpts, updateUserOpts, loginNewUserOpts,
    getfolderOpts, addfolderOpts, deletefolderOpts, favouritefolderOpts, dateafterOpts, datebeforeOpts, datesameOpts,
    getURLsOpts, postURLOpts, deleteURLOpts
}