const locationModel = require("../../models/dashboardModel/location.model")

let addlocation = async (req, res) => {

    let obj = req.body

    let data = await locationModel.create(obj)

    res.send(
        {
            status: true,
            message: 'location added successfully..',
            data
        }
    )
}

let getlocation = async (req, res) => {

    let data = await locationModel.find()
    res.send(
        {
            status: true,
            message: 'location data fetched...',
            data
        }
    )
}

let editlocation = async (req, res) => {

    let { id } = req.params;
    let obj = req.body
    let data = await locationModel.updateOne({ _id: id }, { $set: obj })
    res.send({
        status: true,
        message: 'location updated now...',
        data
    })
}

let deletelocation = async (req, res) => {

    let { id } = req.params;
    let obj = req.body
    let data = await locationModel.deleteOne({ _id: id })

    res.send(
        {
            status: true,
            message: 'location deleted successfully...',
            data
        }
    )
}

module.exports = { addlocation, getlocation, editlocation, deletelocation }