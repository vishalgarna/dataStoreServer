const mongoose = require('mongoose');
const { db2 } = require('./db.config');

const dataSchema = mongoose.Schema(
    {
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
    }
)

const datamodel = db2.model("data", dataSchema)

module.exports = { datamodel }