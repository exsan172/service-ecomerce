const mongose = require("mongoose")
const userBankAccount = mongose.Schema({
    bank : {
        type    : mongose.Schema.Types.ObjectId,
        ref     : 'bank_avaliable',
        require : true
    },
    addresNumber : {
        type : String,
        require : true
    },
    ownerName : {
        type : String,
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

module.exports = mongose.model("user_bank_account", userBankAccount)