const mongoose = require('mongoose')
const BetSchema = new mongoose.Schema({
    betID : {
        type: String,
        required: false,
    },
    crypto : {
        type: String,
        required: true,
    },
    creationDate: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: String,
        required: true,
    },
    creationPrice: {
        type: Number,
        required: true,
    },
    strikePrice: {
        type: Number,
        required: true,
    },
    statusCode : {
        type: Number,
        required: true,
    },
    daysExpiry: Number,
});

const BetModel = mongoose.model("bet", BetSchema);
module.exports = BetModel;