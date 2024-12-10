const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const db2 = mongoose.createConnection('mongodb+srv://vishalgarna:vishalgarna%401@userinfo.oup8e.mongodb.net/forexData', {
});

db2.on('error', console.error.bind(console, 'connection error:'));
db2.once('open', () => {
    console.log('Connected to db2');
});


// this list creating to add and remove multiple pairs and handle data 
const currencyPairs = [
    "EURUSD", "USDJPY", "GBPUSD", "USDCHF", "NZDJPY",
    "EURJPY", "GBPJPY", "DXY", "ADAUSD", "AUDUSD"
    //  "AUDJPY", "EURAUD", "EURCHF", "AUDNZD",
    //     "NZDJPY", "GBPAUD", "GBPCAD", "EURNZD", "AUDCAD", "GBPCHF", "AUDCHF",
    //     "EURCAD", "CADJPY", "GBPNZD", "CADCHF", "CHFJPY", "NZDCAD", "NZDCHF",
    //     "USDHKD", "GBPZAR", "EURZAR", "USDZAR", "AUDZAR", "CADZAR", "CHFZAR",
    //     "JPYZAR", "NZDZAR", "TRYZAR", "BRLZAR", "MXNZD", "MXNJPY", "MXNCHF",
    //     "MXNGBP", "MXNUSD", "MXNTRY", "MXNZAR", "MXNCHF", "MXNJPY", "MXNGBP",
    //     "MXNUSD"
];


module.exports = { db2, currencyPairs };
