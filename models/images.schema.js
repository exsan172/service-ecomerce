const mongose = require("mongoose")
const productImagesSchema = mongose.Schema({
    variantName : {
        type : String,
        require : true
    },
    imagesVariant : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        require : true
    }
})

module.exports = mongose.model("product_images", productImagesSchema)