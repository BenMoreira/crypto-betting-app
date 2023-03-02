const mongoose = require('mongoose')
const WagerSchema = new mongoose.Schema({
    betID : {
        type: String,
        required: true,
    },
    userID : {
        type: String,
        required: true,
    },
    placedDate : {
        type: String,
        required: true,
    },
    wagerValue : {
        type: Number,
        required: true,
    },
});

const WagerModel = mongoose.model("wager", WagerSchema);
module.exports = WagerModel;