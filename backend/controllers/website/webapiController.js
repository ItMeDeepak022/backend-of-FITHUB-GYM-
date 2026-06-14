let fetchprogram = async (req, res) => {

    res.send(
        {
            status: true,
            message: 'program data fetched...'
        }
    )
}


module.exports = { fetchprogram }