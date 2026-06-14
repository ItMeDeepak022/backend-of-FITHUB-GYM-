const cloudinary = require("../../config/cloudinary");
const testimonialModel = require("../../models/dashboardModel/testimonial.model");
let addtestimonial = async (req, res) => {

    let obj = { ...req.body }

    if (req.file) {
        if (req.file.path) {
            obj.testimonialImg = req.file.path,
                obj.public_id = req.file.filename
        }
    }

    let data = await testimonialModel.create(obj)

    res.send({
        status: true,
        message: 'testimonial added..',
        data
    })
}


let gettestimonial = async (req, res) => {

    let data = await testimonialModel.find()
    res.send({
        status: true,
        message: 'testimonial geted..',
        url: process.env.Imgurl,
        data
    })
}

let edittestimonial = async (req, res) => {

    let { id } = req.params;
    let insertObj = { ...req.body };

    let Resdata = await testimonialModel.findById(id);


    if (req.file) {
        // delete exits img from cloud storage
        if (Resdata.public_id) {
            await cloudinary.uploader.destroy(Resdata.public_id)
        }
        insertObj.testimonialImg = req.file.path,
            insertObj.public_id = req.file.filename
    }


    let data = await testimonialModel.updateOne(
        { _id: id },
        { $set: insertObj }
    );

    res.send({
        status: true,
        message: "testimonial updated now..",
        data
    });
};



let deletetestimonial = async (req, res) => {

    let { id } = req.params

    // old data
    let Resdata = await testimonialModel.findById(id)

    if (Resdata.public_id) {
        await cloudinary.uploader.destroy(Resdata.public_id)
    }

    let data = await testimonialModel.deleteOne({ _id: id })
    res.send({
        status: true,
        message: 'testimonial deleted..',
        data
    })
}
module.exports = { addtestimonial, gettestimonial, edittestimonial, deletetestimonial }