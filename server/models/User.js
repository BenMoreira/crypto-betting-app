const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    userID : {
        type: String,
        required: true,
    },
    tokens : {
        type: Number,
        required: true,
    },
    pins : {
        type: Array,
        reuired: false,
    }
    // },
    // tokens : {
    //     type: Number,
    //     required: true,
    // },
});

const UserModel = mongoose.model("auths", UserSchema);
module.exports = UserModel;