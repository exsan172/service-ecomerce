const config = require("../config")
const proviceModels = require("../models/provice.schema")
const cityModels = require("../models/city.schema")
const paymentMethodModels = require("../models/paymentMethod.schema")
const bankAvaliable = require("../models/bankAvaliable.schema")

const dashboardControllers = {
    updateProvice : async (req, res, next) => {
        try {
            const getProvice = await config.requestApi.get("/province", { key: process.env.API_KEY })
            if(getProvice.data.rajaongkir.status.code === 200){
                for(const i in getProvice.data.rajaongkir.results){
                    
                    const findDuplicate = await proviceModels.findOne({ province_id: getProvice.data.rajaongkir.results[i].province_id})
                    if(findDuplicate === null) {
                        await proviceModels.create({
                            province_id : getProvice.data.rajaongkir.results[i].province_id,
                            province    : getProvice.data.rajaongkir.results[i].province,
                            createdAt   : await config.time()
                        })
                    }
                }

                config.response(res, 200, "success")
            } else {
                config.response(res, 400, "failed")
            }
        } catch (error) {
            config.response(res, 400, error)
        }
    },

    updateCity : async (req, res, next) => {
        try {
            const getCity = await config.requestApi.get("/city", { key: process.env.API_KEY })
            if(getCity.data.rajaongkir.status.code === 200){
                for(const i in getCity.data.rajaongkir.results){
                    
                    const findDuplicate = await cityModels.findOne({ city_id: getCity.data.rajaongkir.results[i].city_id})
                    if(findDuplicate === null) {
                        await cityModels.create({
                            city_id     : getCity.data.rajaongkir.results[i].city_id,
                            province_id : getCity.data.rajaongkir.results[i].province_id,
                            province    : getCity.data.rajaongkir.results[i].province,
                            type        : getCity.data.rajaongkir.results[i].type,
                            city_name   : getCity.data.rajaongkir.results[i].city_name,
                            postal_code : getCity.data.rajaongkir.results[i].postal_code,
                            createdAt   : await config.time()
                        })
                    }
                }
                
                config.response(res, 200, "success")
            } else {
                config.response(res, 400, "failed")
            }
        } catch (error) {
            config.response(res, 400, error)
        }
    },
    checkCost : async (req, res, next) => {
        try {
            const cost = await config.requestApi.post("/cost", { key: process.env.API_KEY }, {
                origin      : req.body.origin,
                destination : req.body.destination,
                weight      : req.body.weight,
                courier     : req.body.courier
            })
            config.response(res, 200, "success", {
                origin_details : cost.data.rajaongkir.origin_details,
                destination_details : cost.data.rajaongkir.destination_details,
                result : cost.data.rajaongkir.results
            })
        } catch (error) {
            config.response(res, 400, error)
        }
    },

    createPaymentMethod : async (req, res, next) => {
        try {
            const create = await paymentMethodModels.create({
                "paymentName"       : req.body.paymentName,
                "paymentIcon"       : req.body.paymentIcon,
                "paymentAddress"    : req.body.paymentAddress,
                "paymentOwnerName"  : req.body.paymentOwnerName,
                "createdAt"         : await config.time()
            })
            config.response(res, 200, create)
        } catch (error) {
            config.response(res, 400, error)
        }
    },
    updatePaymentMethod : async (req, res, next) => {
        try {
            await paymentMethodModels.updateOne({_id: req.body.id }, {
                "paymentName"       : req.body.paymentName,
                "paymentIcon"       : req.body.paymentIcon,
                "paymentAddress"    : req.body.paymentAddress,
                "paymentOwnerName"  : req.body.paymentOwnerName,
            })
            config.response(res, 200, "success", req.body)
        } catch (error) {
            config.response(res, 400, error)
        }
    },
    deletePaymentMethod : async (req, res, next) => {
        try {
            const del = await paymentMethodModels.deleteOne({ _id: req.par.id })
            config.response(res, 200, "success", req.body)

        } catch (error) {
            config.response(res, 400, error)
        }
    },
    getPaymentMethod : async (req, res, next) => {
        try {
            const get = await paymentMethodModels.find()
            config.response(res, 200, get)
        } catch (error) {
            config.response(res, 400, error)
        }
    },


    createBankAvaliable : async (req, res, next) => {
        try {
            if(req.file) {
                const createBank = await bankAvaliable.create({
                    bankName : req.body.bankName,
                    icon     : process.env.URL_ASSETS+"/assets/"+req.file.filename,
                    iconName : req.file.filename,
                    createdAt: await config.time()
                })
                config.response(res, 200, createBank)

            } else {
                config.response(res, 400, "failed, create bank")
            }
        } catch (error) {
            config.response(res, 400, error)
        }
    },
    updateBankAvaliable : async (req, res, next) => {
        try {
            const updateBank = await bankAvaliable.updateOne({ _id: req.body.id }, {
                bankName : req.body.bankName,
                icon     : "",
            })
            config.response(res, 200, updateBank)
        } catch (error) {
            config.response(res, 400, error)
        }
    },
    getBankAvaliable : async (req, res, next) => {
        try {
            const getBank = await bankAvaliable.find()
            config.response(res, 200, getBank)
            
        } catch (error) {
            config.response(res, 400, error)
        }
    },
    deleteBankAvaliable : async (req, res, next) => {
        try {
            const deleteBank = await bankAvaliable.deleteOne({ _id: req.params.id })
            config.response(res, 200, deleteBank)
            
        } catch (error) {
            config.response(res, 400, error)
        }
    }
}

module.exports = dashboardControllers