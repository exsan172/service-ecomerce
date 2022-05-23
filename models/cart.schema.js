const mongose = require("mongoose")
const cartSchema = mongose.Schema({
    product : {
        type : String,
        require : true
    },
    quantity : {
        type : String,
        require : true
    },
    note : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        require : true
    }
})

module.exports = mongose.model("cart", cartSchema)