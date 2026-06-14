const faqModel = require("../../models/dashboardModel/faq.model")

let addFaq = async (req, res) => {

    try {
        let obj = req.body
        let data = await faqModel.create(obj)

        res.send({
            status: true,
            message: 'Faq added successfully..',
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

let getFaq = async (req, res) => {
    try {

        let data = await faqModel.find()

        res.send({
            status: true,
            message: 'Faq fetching successfully..',
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
let editFaq = async (req, res) => {

    try {
        let { id } = req.params;
        let obj = req.body

        let data = await faqModel.updateOne({ _id: id }, { $set: obj })

        res.send({
            status: true,
            message: 'Faq updated successfully..',
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
let deleteFaq = async (req, res) => {

    try {
        let { id } = req.params;

        let data = await faqModel.deleteOne({ _id: id })

        res.send({
            status: true,
            message: 'Faq added successfully..',
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

module.exports = { addFaq, getFaq, deleteFaq, editFaq }