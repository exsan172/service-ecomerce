const mongose = require("mongoose")
const citySchema = mongose.Schema({
    city_id : {
        type : String,
        require : true
    },
    province_id : {
        type : String,
        require : true
    },
    province : {
        type : String,
        require : true
    },
    type : {
        type : String,
        require : true
    },
    city_name : {
        type : String,
        require : true
    },
    postal_code : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        require : true
    }
})

module.exports = mongose.model("city", citySchema)