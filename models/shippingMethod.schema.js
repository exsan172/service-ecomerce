const mongose = require("mongoose")
const shippingMethod = mongose.Schema({
    nameShipping : {
        type : String,
        require : true
    },
    iconShipping : {
        type : String,
        require : true
    },
    shipingCode : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        require : true
    }
})

module.exports = mongose.model("shipping", shippingMethod)