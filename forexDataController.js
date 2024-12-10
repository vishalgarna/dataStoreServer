const forextDataservices = require('./ForexData.services')

exports.getData = (req, res, next) => {

    const parmas = {

        "symbol": "",
        "period": " ",
        "timeInterval": ""
    }

    forextDataservices.GetCloseData(parmas, (err, response) => {

        if (err) {
            next(err)
        }
        else {
            res.status(200).send({
                message: "success",
                data: response
            })
        }
    })

}