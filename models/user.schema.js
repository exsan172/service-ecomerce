const mongose = require("mongoose")
const userSchema = mongose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    blockAccount : {
        type : Boolean,
        require : true
    },
    role : {
        type : String,
        require : true
    },
    phoneNumber : {
        type : String,
        require : true
    },
    address : {
        type    : mongose.Schema.Types.ObjectId,
        ref     : 'user_address',
        require : true
    },
    createdAt : {
        type : Date,
        require : true
    }
})

module.exports = mongose.model("user", userSchema)