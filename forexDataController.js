const forextDataservices = require('./ForexData.services')

exports.getData = (req, res, next) => {

    const parmas = {

        "symbol": req.body.symbol,
        "period": req.body.period,
        "timeInterval": req.body.timeInterval
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