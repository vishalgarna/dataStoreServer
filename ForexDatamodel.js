const mongoose = require('mongoose');
const { db2 } = require('./db.config');

const forexdataSchema = mongoose.Schema({
    symbol: {
        type: String,

    },
    data15m: [{
        time: {
            type: Number,

        },
        open: {
            type: Number,

        },
        high: {
            type: Number,

        },
        low: {
            type: Number,

        },
        close: {
            type: Number,

        }
    }],
    data5m: [{
        time: {
            type: Number,

        },
        open: {
            type: Number,

        },
        high: {
            type: Number,

        },
        low: {
            type: Number,

        },
        close: {
            type: Number,

        }
    }],
    data1m: [{
        time: {
            type: Number,

        },
        open: {
            type: Number,

        },
        high: {
            type: Number,

        },
        low: {
            type: Number,

        },
        close: {
            type: Number,

        }
    }]
}, { timestamps: true });

const ForexDataModel = db2.model('ForexData', forexdataSchema);

module.exports = { ForexDataModel };
