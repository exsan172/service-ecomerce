const mongose = require("mongoose")
const checkoutSchema = mongose.Schema({
    buyer : {
        type : String,
        require : true
    },
    cart : {
        type : String,
        require : true
    },
    shippingPrice : {
        type : String,
        require : true
    },
    totalPrice : {
        type : String,
        require : true
    },
    payed : {
        type : Boolean,
        require : true
    },
    proofTransfer : {
        type : String,
        require : true
    },
    status : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        require : true
    }
})

module.exports = mongose.model("checkout", checkoutSchema)