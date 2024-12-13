require('./db.config')
const { ForexDataModel } = require('./ForexDatamodel')

async function addPair(params) {

    if (!params) {
        console.log('Please Provicde data');
    }
    else {
        try {

            const CartDB = await ForexDataModel.findOne({ symbol: params.symbol })

            // agar koi error aati hai 

            // mtlb ki koi data nahi ilta null aata hai tab 
            // new data seave karo with symbol 
            if (CartDB === null) {

                if (params.symbol != null) {
                    const newdata = {
                        "symbol": params.symbol,
                        "data1m": [
                            params.data
                        ]
                    }
                    const newForexPair = ForexDataModel(newdata)
                    await newForexPair.save().then(() => console.log("succesfully added new pair ")).catch((err) => console.log(err))
                }
            }
            // agar mil jata hai 
            else {
                // yaha ye find karke update kar raha hai 

                if (params.timeframe === '1m') {
                    await ForexDataModel.updateOne({ symbol: params.symbol }, { $push: { data1m: params.data } })
                        .then(() => console.log('update 1min data SuccessFully')
                        ).catch((err) => console.log('error in 1 min data saving')
                        )
                }
                else if (params.timeframe === '5m') {

                    await ForexDataModel.updateOne({ symbol: params.symbol }, { $push: { data5m: params.data } })
                        .then(() => console.log('updated 5 min data successsfully')
                        ).catch((err) => console.log('error in 5 min data saving')
                        )
                }
                else if (params.timeframe === '15m') {

                    await ForexDataModel.updateOne({ symbol: params.symbol }, { $push: { data15m: params.data } })
                        .catch((err) => console.log('error in 15 min data saving')
                        )
                }


            }



        } catch (error) {
            console.log(error);
        }

    }

}

async function GetCloseData(peiod, symbol) {
    try {
        const document = await ForexDataModel.findOne({ symbol: symbol })
        // console.log(document);

        if (document) {
            const closeValues = document.data1m.map(item => item.close);
            // slice - hume arr ko modified karke deta hai kha se kha tak ki value ho tab 
            const modifiedData = closeValues.slice(-(peiod))

            return modifiedData
        } else {
            console.log('No document found for the given symbol.');
        }
    } catch (error) {
        console.error('Error fetching document:', error);
    }
}


module.exports = {
    addPair,
    GetCloseData
}