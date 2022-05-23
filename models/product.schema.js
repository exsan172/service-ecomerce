const mongose = require("mongoose")
const productSchema = mongose.Schema({
    images : {
        type : String,
        require : true
    },
    productName : {
        type : String,
        require : true
    },
    category : {
        type : String,
        require : true
    },
    price : {
        type : String,
        require : true
    },
    priceDiscount : {
        type : String,
        require : true
    },
    discountPercent : {
        type : String,
        require : true
    },
    discount : {
        type : Boolean,
        require : true
    },
    stock : {
        type : Number,
        require : true
    },
    description : {
        type : Number,
        require : true
    },
    variant : {
        type : String,
        require : true
    },
    weight : {
        type : Number,
        require : true
    },
    createdAt : {
        type : Date,
        require : true
    }
})

module.exports = mongose.model("product", productSchema)