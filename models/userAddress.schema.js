const mongose = require("mongoose")
const userAddress = mongose.Schema({
    receiver : {
        type : String,
        require : true
    },
    addressComplete : {
        type : String,
        require : true
    },
    city : {
        type    : mongose.Schema.Types.ObjectId,
        ref     : 'city',
        require : true
    },
    province : {
        type    : mongose.Schema.Types.ObjectId,
        ref     : 'provice',
        require : true
    },
    active : {
        type : Boolean,
        require : true
    },
    createdAt : {
        type : Date,
        require : true
    }
})

module.exports = mongose.model("user_address", userAddress)