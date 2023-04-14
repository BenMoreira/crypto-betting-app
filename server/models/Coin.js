const mongoose = require('mongoose')
const CoinSchema = new mongoose.Schema({
    crypto : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    shortTermOHLC :{
        type: Array,
        required: true,
    },
    longTermOHLC : {
        type: Array,
        required: true,
    },
    
});

const CoinModel = mongoose.model("coin", CoinSchema);
module.exports = CoinModel;