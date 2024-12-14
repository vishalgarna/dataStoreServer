const websocket = require('ws');
const forexServices = require('../ForexData.services');
const { currencyPairs } = require('../db.config');

// connect function


// smja jo humne upar pahle initailakya ohlc data jitn bhi cureeny 
// pairs unka phir unka ohlc data update kiya symbol ke through usk baad 
// time inter val par jo jittbhi symmbol ka data update ho raka 
// hai saveohlca data ko call karkefor loop ki madad se add fuction me data senda 
// kar rahe yahi hai puri proesss agar haa to iss puri procee ko kya khete hai

// Donloaas - Dotenv, docker, mt5, mt5libraries,

const ohlcData = {};


const chekTimeframe = (timeframe) => {
    const timeMapping = {
        "1m": 1,
        "5m": 5,
        "15m": 15,
        "30m": 30,
        "1h": 60,
        "2h": 120,
        "4h": 240,
        "1d": 1440

    };

    return timeMapping[timeframe] ? timeMapping[timeframe] * 60 * 1000 : null;
};

currencyPairs.forEach((symbol) => {

    ohlcData[symbol] = {
        time: null,
        open: null,
        high: null,
        low: null,
        close: null,
    }
})


const WsConnection = () => {

    const ws = new websocket('wss://marketdata.tradermade.com/feedadv');


    let jsonData = {};



    const timeframes = ["1m", "5m", "15m", "30m", "1h", "2h", "4h", "1d"]


    // humne yaha har symbol ke liye ohlcdata intitliaze kardiya firstly 
    // statrting me sabki value null se
    currencyPairs.forEach((symbol) => {

        ohlcData[symbol] = {
            time: null,
            open: null,
            high: null,
            low: null,
            close: null,
        }
    })



    ws.on('open', function open() {

        const request = JSON.stringify({
            userKey: "wsVIl_0HsKk9NhXqKJgA",
            // yaha pe hume cureency pair ke arry ka join method ki madad se jtini pairs unko ek string me 
            //badalkar comma se seprate kar diya 
            symbol: currencyPairs.join(',')
        });

        ws.send(request);

    });

    ws.on('message', function incoming(data) {
        // Buffer to string conversion
        let readableData = data.toString('utf-8');



        // If data is JSON, parse it

        try {
            // ya hum json me paas kare rahe data ko 

            // console.log(JSON.parse(readableData));

            jsonData = JSON.parse(readableData)

            // console.log(`vishal ${jsonData.mid}`);

            // console.log(jsonData);

            // mide value store in price 
            const symbol = jsonData.symbol
            const price = jsonData.mid;

            // first time is come in this 
            if (ohlcData[symbol].open === null) {

                ohlcData[symbol].open = price;
            }

            //symbol ke aacording  unka ohlc data update kar rahe hai 
            ohlcData[symbol].high = ohlcData[symbol].high === null ? price : Math.max(ohlcData[symbol].high, price);
            ohlcData[symbol].low = ohlcData[symbol].low === null ? price : Math.min(ohlcData[symbol].low, price);
            ohlcData[symbol].close = price;
            ohlcData[symbol].time = jsonData.ts
        } catch (error) {
            console.error("Error parsing JSON data: ", error);
        }
    });


    // ye function ek time frma leta hai praticular leta hiar 
    //  jitni currency pairs un sabhi ka 
    // updated ohlca date ke liye add pair function call karta hai 
    const saveohlcData = async (timeInterval) => {

        for (const symbol of currencyPairs) {

            const params = {
                "symbol": symbol,
                "data": ohlcData[symbol],
                "timeframe": timeInterval
            }

            await forexServices.addPair(params);

            ohlcData[symbol] = {
                time: null,
                open: null,
                high: null,
                low: null,
                close: null,
            }
        }
    }

    timeframes.forEach((timeframe) => {
        const interval = chekTimeframe(timeframe)
        setInterval(() => saveohlcData(timeframe), interval)
    })

}

WsConnection()

module.exports = WsConnection;



