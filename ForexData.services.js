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


                if (params.timeframe === '1m') {


                    if (params.symbol != null && params.close != null) {
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

                else if (params.timeframe === '5m') {

                    if (params.symbol != null && params.close != null) {
                        const newdata = {
                            "symbol": params.symbol,
                            "data5m": [
                                params.data
                            ]
                        }
                        const newForexPair = ForexDataModel(newdata)
                        await newForexPair.save().then(() => console.log("succesfully added new pair ")).catch((err) => console.log(err))
                    }
                }

                else if (params.timeframe === '15m') {
                    if (params.symbol != null && params.close != null) {
                        const newdata = {
                            "symbol": params.symbol,
                            "data15m": [
                                params.data
                            ]
                        }
                        const newForexPair = ForexDataModel(newdata)
                        await newForexPair.save().then(() => console.log("succesfully added new pair ")).catch((err) => console.log(err))
                    }

                }


                else if (params.timeframe === '30m') {

                    if (params.symbol != null && params.close != null) {
                        const newdata = {
                            "symbol": params.symbol,
                            "data30m": [
                                params.data
                            ]
                        }
                        const newForexPair = ForexDataModel(newdata)
                        await newForexPair.save().then(() => console.log("succesfully added new pair ")).catch((err) => console.log(err))
                    }
                }

                else if (params.timeframe === '1h') {
                    if (params.symbol != null && params.close != null) {
                        const newdata = {
                            "symbol": params.symbol,
                            "data1h": [
                                params.data
                            ]
                        }
                        const newForexPair = ForexDataModel(newdata)
                        await newForexPair.save().then(() => console.log("succesfully added new pair ")).catch((err) => console.log(err))
                    }

                }
                else if (params.timeframe === '2h') {
                    if (params.symbol != null && params.close != null) {
                        const newdata = {
                            "symbol": params.symbol,
                            "data2h": [
                                params.data
                            ]
                        }
                        const newForexPair = ForexDataModel(newdata)
                        await newForexPair.save().then(() => console.log("succesfully added new pair ")).catch((err) => console.log(err))
                    }

                }


                else if (params.timeframe === '4h') {

                    if (params.symbol != null && params.close != null) {
                        const newdata = {
                            "symbol": params.symbol,
                            "data4h": [
                                params.data
                            ]
                        }
                        const newForexPair = ForexDataModel(newdata)
                        await newForexPair.save().then(() => console.log("succesfully added new pair ")).catch((err) => console.log(err))
                    }
                }

                else if (params.timeframe === '1d') {
                    if (params.symbol != null && params.close != null) {
                        const newdata = {
                            "symbol": params.symbol,
                            "data1d": [
                                params.data
                            ]
                        }
                        const newForexPair = ForexDataModel(newdata)
                        await newForexPair.save().then(() => console.log("succesfully added new pair ")).catch((err) => console.log(err))
                    }

                }

            }
            // agar mil jata hai 
            else {
                // yaha ye find karke update kar raha hai 

                if (params.timeframe === '1m' && params.close != null) {
                    await ForexDataModel.updateOne({ symbol: params.symbol }, { $push: { data1m: params.data } })
                        .then(() => console.log('update 1min data SuccessFully')
                        ).catch((err) => console.log('error in 1 min data saving')
                        )
                }
                else if (params.timeframe === '5m' && params.close != null) {

                    await ForexDataModel.updateOne({ symbol: params.symbol }, { $push: { data5m: params.data } })
                        .then(() => console.log('updated 5 min data successsfully')
                        ).catch((err) => console.log('error in 5 min data saving')
                        )
                }
                else if (params.timeframe === '15m' && params.close != null) {

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

async function GetCloseData(params, callback) {
    try {
        const document = await ForexDataModel.findOne({ symbol: params.symbol })
        // console.log(document);

        if (document) {
            if (params.timeInterval === "1m") {
                const closeValues = document.data1m.map(item => item.close);
                // slice - hume arr ko modified karke deta hai kha se kha tak ki value ho tab 
                const modifiedData = closeValues.slice(-(params.period || 50))

                return callback(null, modifiedData)
            }
            else if (params.timeInterval === "5m") {
                const closeValues = document.data5m.map(item => item.close);
                // slice - hume arr ko modified karke deta hai kha se kha tak ki value ho tab 
                const modifiedData = closeValues.slice(-(params.period || 50))

                return callback(null, modifiedData)
            }
            else if (params.timeInterval === "15m") {
                const closeValues = document.data15m.map(item => item.close);
                // slice - hume arr ko modified karke deta hai kha se kha tak ki value ho tab 
                const modifiedData = closeValues.slice(-(params.period || 50))

                return callback(null, modifiedData)
            }
            else if (params.timeInterval === "30m") {
                const closeValues = document.data30m.map(item => item.close);
                // slice - hume arr ko modified karke deta hai kha se kha tak ki value ho tab 
                const modifiedData = closeValues.slice(-(params.period || 50))

                return callback(null, modifiedData)
            }
            else if (params.timeInterval === "1h") {
                const closeValues = document.data1h.map(item => item.close);
                // slice - hume arr ko modified karke deta hai kha se kha tak ki value ho tab 
                const modifiedData = closeValues.slice(-(params.period || 50))

                return callback(null, modifiedData)
            }
            else if (params.timeInterval === "2h") {
                const closeValues = document.data2h.map(item => item.close);
                // slice - hume arr ko modified karke deta hai kha se kha tak ki value ho tab 
                const modifiedData = closeValues.slice(-(params.period || 50))

                return callback(null, modifiedData)
            }
            else if (params.timeInterval === "4h") {
                const closeValues = document.data4h.map(item => item.close);
                // slice - hume arr ko modified karke deta hai kha se kha tak ki value ho tab 
                const modifiedData = closeValues.slice(-(params.period || 50))

                return callback(null, modifiedData)
            }
            else {
                const closeValues = document.data1d.map(item => item.close);
                // slice - hume arr ko modified karke deta hai kha se kha tak ki value ho tab 
                const modifiedData = closeValues.slice(-(params.period || 50))

                return callback(null, modifiedData)
            }


        } else {
            console.log('No document found for the given symbol.');
            return callback({ "error": "no dat is found " })

        }
    } catch (error) {

        return callback({ "error": "no dat is found " })
    }
}


module.exports = {
    addPair,
    GetCloseData
}