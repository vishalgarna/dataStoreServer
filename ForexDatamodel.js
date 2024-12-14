const mongoose = require('mongoose');
const { db2 } = require('./db.config');

const forexdataSchema = mongoose.Schema({
    symbol: {
        type: String,

    },
    data1m: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "data"
        }],
    data5m: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "data"
        }],
    data15m: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "data"
        }],
    data30m: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "data"
        }],
    data1h: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "data"
        }],
    data2h: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "data"
        }],
    data4h: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "data"
        }],
    data1d: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "data"
        }],

}, { timestamps: true });

const ForexDataModel = db2.model('ForexData', forexdataSchema);

module.exports = { ForexDataModel };
