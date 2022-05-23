const mongose = require("mongoose")
const proviceSchema = mongose.Schema({
    province_id : {
        type : String,
        require : true
    },
    province : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        require : true
    }
})

module.exports = mongose.model("provice", proviceSchema)