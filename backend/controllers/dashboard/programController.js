const cloudinary = require("../../config/cloudinary");
const programModel = require("../../models/dashboardModel/programModel")


let addProgram = async (req, res) => {
    try {

        let insertObj = { ...req.body }

        if (req.file) {
            if (req.file.path) {
                insertObj['programImg'] = req.file.path      // ✅ URL
                insertObj['public_id'] = req.file.filename   // ✅ for delete/update
            }
        }

        let data = await programModel.create(insertObj)

        res.send({
            status: true,
            message: "Program added successfully..",
            data
        })
    }
    catch (err) {
        res.send({
            status: false,
            error: err.message
        })
    }
}

let getProgram = async (req, res) => {

    let data = await programModel.find()

    res.send({
        status: true,
        message: 'program data fetched..',
        data
    })
}



let updateProgram = async (req, res) => {

    let { id } = req.params

    // old data
    let data = await programModel.findById(id)

    let insertObj = { ...req.body }


    // 🔥 NEW FILE AAYI TO OLD DELETE KARO
    if (req.file) {

        // ✅ Cloudinary se old delete
        if (data.public_id) {
            await cloudinary.uploader.destroy(data.public_id)
        }

        // ✅ new file set
        insertObj.programImg = req.file.path;       // URL
        insertObj.public_id = req.file.filename;    // public_id
    }

    let resdata = await programModel.updateOne(
        { _id: id },
        {
            $set: insertObj
        }
    )

    res.send({
        status: true,
        message: "Program updated successfully...",
        resdata
    })
}


let deleteProgram = async (req, res) => {

    let { id } = req.params

    // old data
    let data = await programModel.findById(id)

    // 🔥 Cloudinary se delete
    if (data.public_id) {
        await cloudinary.uploader.destroy(data.public_id);
    }

    // 🔥 DB se delete

    let ResObj = await programModel.deleteOne({ _id: id })

    res.send({
        status: true,
        message: 'Data deleted successfully...',
        ResObj
    })
}



module.exports = { addProgram, getProgram, updateProgram, deleteProgram }