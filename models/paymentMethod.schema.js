const mongose = require("mongoose")
const paymentMethodSchema = mongose.Schema({
    bank :{
        type    : mongose.Schema.Types.ObjectId,
        ref     : 'bank_avaliable',
        require : true
    },
    paymentAddress : {
        type : String,
        require : true
    },
    paymentOwnerName : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        require : true
    }
})

module.exports = mongose.model("payment_method", paymentMethodSchema)