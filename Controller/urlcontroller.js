const mongoose = require("mongoose")
const { User, Url } = require('../Models/Schema')

const getURLs = async (req, res) => {
    const phone = req.params.phone
    const name = req.params.name
    const u = await User.findOne({ phone: phone })
    const id = u._id

    const user = await Url.findOne({ user: id, name: name })
    res.send(user.urls)

}

const postURL = async (req, res) => {
    try {

        const newurl = req.body.urls;
        const groupname = req.params.groupname;
        const phone = req.params.phone;

        const ui = await User.findOne({ phone: phone })
        const id = ui._id

        //const x=await Url.find({user:id})
        const u = await Url.findOneAndUpdate({ user: id, name: groupname }, { $push: { urls: newurl } })
        u.save()
res.status(200).send("Added successfully")

    } catch (err) {
        console.error(err)
    }
}
const deleteURL = async (req, res) => {

    const groupname = req.params.name;
    let url2 = req.params.url
    url2 = "http://" + url2
    const phone = req.params.phone;

    const ui = await User.findOne({ phone: phone })
    const id = ui._id

    const x = await Url.findOne({ user: id, name: groupname })

    var vari = x.urls.filter((item) => (!(item === url2)))
    await Url.updateOne({ user: id, name: groupname }, { urls: vari })
    res.status(200).send("deleted successfully")
}
module.exports = { getURLs, postURL, deleteURL }