const mongoose = require("mongoose")
const { User, Url } = require("../Models/Schema")
const bcrypt = require("bcryptjs")
const json = require("jsonwebtoken")

//////////////LOGIN////////////

const loginNewUser = async (req, res) => {
    try {
        const { name, phone, password } = req.body
        const user = await User.findOne({ phone: phone })
        if (!user) {
            res.send("Invalid credentials")
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            const token = await user.generateAuthToken()
            console.log(token)
            const verifyUser = json.verify(token, process.env.SECRET_KEY);
            console.log(verifyUser)
            if (!isMatch) {
                res.status(300).send('Invalid credentials');
            }
            else {

                const u = await User.findOne({ _id: verifyUser._id })
                res.status(300).send("Login Successful");
            }



        }
    } catch (err) {
        res.status(300).send(err)
    }
}


////////////////User CRUD//////////////////
const getUser = async (req, reply) => {
    try {
        const u = await User.find().populate({ path: 'folder', model: "url" })
        reply.send(u)
    } catch (err) {
        console.error(err)
    }
}
const getSingleUser = async (req, reply) => {
    try {
        const phone = req.params.phone
        const user = await User.findOne({ phone: phone }).populate({ path: 'folder', model: 'url' })
        reply.send(user)
    } catch (err) {
        console.log(err)
    }

}

const signInUser = async (req, reply) => {
    try {
        const { name, phone, password } = req.body;

        if (!phone) {
            reply.status(404).send('Please enter a phone number');
        } else {

            try {
                const user = await User.findOne({ phone: phone })

                if (user == null) {
                    if (!password) {

                        reply.status(300).send("Please enter a password")
                    } else {

                        const u = new User(req.body)
                        var passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
                        if (!passwordcheck.test(password)) {

                            reply.status(300).send("Please enter a valid password. It must contain atleast a digit and special character must be 8 chracters long")
                        } else {
                            // const token=await u.generateAuthToken()
                            // reply.cookie("jwt",token);
                        
                            await u.save((err, u)=>{
                                if(err){
                                    console.log(err, "*****************")
                                }
                            })
                            
                            reply.status(400).send("Signed Up Successfully")
                            
                        }
                    }
                } else {
                    reply.status(300).send("User already exists please login.")
                }
            }
            catch (error) {
                reply.status(404).send('Not Found');
            }

        }


    } catch (error) {
        console.log("outer catch")
        reply.send(error)
    }

}

const updateUser = async (req, reply) => {
    try {
        const phone = req.params.phone
        //console.log(user)
        const u = await User.findOneAndUpdate({ phone: phone }, req.body, { new: true })

        reply.send(u)
    } catch (err) {
        console.error("Please check your data")
    }

}

const deleteUser = async (req, reply) => {
    const phone = req.params.phone
    const user = await User.findOneAndDelete(
        { phone: phone }
    )

    reply.send("Deleted");
}

///////////////////////////////////////////////////

module.exports = { getUser, getSingleUser, deleteUser, updateUser, loginNewUser, signInUser }