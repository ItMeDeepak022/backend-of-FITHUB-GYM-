const cloudinary = require("../../config/cloudinary");
const blogModel = require("../../models/dashboardModel/blog.model")

let addBlog = async (req, res) => {

    let insertObj = { ...req.body }

    if (req.file) {
        if (req.file.path) {
            insertObj['blogImg'] = req.file.path      // ✅ URL
            insertObj['public_id'] = req.file.filename   // ✅ for delete/update
        }
    }

    let data = await blogModel.create(insertObj)
    res.send({
        status: true,
        message: "blogs added successfully..",
        data
    })
}

let getblog = async (req, res) => {

    let data = await blogModel.find()

    res.send({
        status: true,
        message: 'blog data fetched..',
        data
    })
}



let updateblog = async (req, res) => {

    let { id } = req.params

    // old data
    let Resdata = await blogModel.findById(id)

    let insertObj = { ...req.body }


    // 🔥 NEW FILE AAYI TO OLD DELETE KARO
    if (req.file) {

        // ✅ Cloudinary se old delete
        if (Resdata.public_id) {
            await cloudinary.uploader.destroy(Resdata.public_id);
        }

        // ✅ new file set
        insertObj.blogImg = req.file.path;       // URL
        insertObj.public_id = req.file.filename;    // public_id
    }

let data = await blogModel.updateOne(
        { _id: id },
        {
            $set: insertObj
        }
    )

    res.send({
        status: true,
        message: "blog updated successfully...",
        data
    })
}


let deleteblog = async (req, res) => {

    let { id } = req.params

    // old data
    let Data = await blogModel.findById(id)

    if (Data.public_id) {
        await cloudinary.uploader.destroy(Data.public_id)
    }


    // delete mongodb data
    let data = await blogModel.deleteOne({ _id: id })

    res.send({
        status: true,
        message: 'Data deleted successfully...',
        data
    })
}

module.exports = { addBlog, getblog, updateblog, deleteblog }