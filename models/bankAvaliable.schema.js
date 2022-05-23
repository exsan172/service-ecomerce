const mongose = require("mongoose")
const bankAvaliableSchema = mongose.Schema({
    bankName : {
        type : String,
        require : true
    },
    icon : {
        type : String,
        require : true
    },
    iconName : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        require : true
    }
})

module.exports = mongose.model("bank_avaliable", bankAvaliableSchema)