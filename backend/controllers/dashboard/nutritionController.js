const cloudinary = require("../../config/cloudinary");
const nutritionMode = require("../../models/dashboardModel/nutrition.mode");

let addNutrition = async (req, res) => {

    let obj = { ...req.body }


    if (req.file) {
        if (req.file.path) {
             obj['nutritionImg'] = req.file.path      // ✅ URL
             obj['public_id'] = req.file.filename   // ✅ for delete/update
        }
    }


    let data = await nutritionMode.create(obj)


    res.send({
        status: true,
        message: "Nutrition added successfully..",
        data
    })
}

let getNutrition = async (req, res) => {

    let data = await nutritionMode.find()

    res.send({
        status: true,
        message: 'Nutritions data fetched..',
        data
    })
}

let editNutrition = async (req, res) => {

    let { id } = req.params


    // old data
    let data = await nutritionMode.findById(id)


    let insertObj = { ...req.body }


    // 🔥 NEW FILE AAYI TO OLD DELETE KARO
    if (req.file) {

        // ✅ Cloudinary se old delete
        if (data.public_id) {
            await cloudinary.uploader.destroy(data.public_id)
        }

        // ✅ new file set
        insertObj.nutritionImg = req.file.path;       // URL
        insertObj.public_id = req.file.filename;    // public_id
    }



    let Resdata = await nutritionMode.updateOne(
        { _id: id },
        {
            $set: insertObj
        }
    )

    res.send({
        status: true,
        message: " nutrition updated successfully...",
        Resdata
    })
}

let deletenutrition = async (req, res) => {

    let { id } = req.params

    // old data
    let data = await nutritionMode.findById(id)

    if (data.public_id) {
        await cloudinary.uploader.destroy(data.public_id);
    }

    // delete mongodb data
    let Resdata = await nutritionMode.deleteOne({ _id: id })

    res.send({
        status: true,
        message: 'Data deleted successfully...',
        Resdata
    })
}

module.exports = { addNutrition, getNutrition, deletenutrition, editNutrition }