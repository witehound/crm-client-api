const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type: String,
        maxlength: 50,
        required: true
    },
    company : {
        type: String,
        maxlength: 50,
        required: true
    },
    address : {
        type: String,
        maxlength: 100,
        required: true
    },
    phone : {
        type: Number,
        maxlength: 12,
        required: true
    },
    email : {
        type: String,
        maxlength: 50,
        required: true
    },
    password : {
        type: String,
        minlength: 8,
        maxlength: 50,
        required: true
    }
})

 

module.exports ={ UserSchema: mongoose.model("User",userSchema)} 