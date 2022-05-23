const bcrypt = require("bcrypt")
const jwt    = require("jsonwebtoken") 
const moment = require("moment-timezone")
const jwtDecode = require("jwt-decode")
const salt   = 10
const config = require("../config")
const userModels = require("../models/user.schema")
const bankAccountModels = require("../models/userBankAccount.schema")

const clietControllers = {
    login : async (req, res, next) => {
        try {
            const findEmail = await userModels.findOne({ email: req.body.email })
            if(findEmail !== null) {
                const comparePassword = await bcrypt.compareSync(req.body.password, findEmail.password)
                if(comparePassword) {
                    const signJwt = await jwt.sign({
                        name  : findEmail.name,
                        email : findEmail.email,
                        role  : findEmail.role
                    }, process.env.SECRET_KEY)

                    const msgLogin = 
                        `<span>
                            Ada aktivitas login terbaru dari akun anda pada <b>${moment(await config.time()).format("D MMM YYYY. HH:mm")}(GMT+7)</b>, abaikan pesan ini jika itu benar-benar anda.
                        <span>
                        <br/><br/><br/>
                        <span>Hormat kami, <b>e-comerce</b></span>`

                    config.mail(findEmail.email, "Aktivitas login terbaru", msgLogin).then(() =>{
                        config.response(res, 200, "success login", {
                            nameUser  : findEmail.name,
                            token : signJwt
                        })
                    }).catch(err => {
                        config.response(res, 400, err)
                    }) 

                } else {
                    config.response(res, 400, "Failed login, username or password is not match.")        
                }
            } else {
                config.response(res, 400, "Failed login, email is not found in our database.")    
            }
            
        } catch (error) {
            config.response(res, 400, error.message)
        }
    },

    register : async (req, res, next) => {
        try {
            const findDuplicate = await userModels.findOne({ email: req.body.email })
            if(findDuplicate === null) {
                const hashPassword = bcrypt.hashSync(req.body.password, salt)
                const createUser = await userModels.create({
                    name         : req.body.name,
                    email        : req.body.email,
                    password     : hashPassword,
                    blockAccount : false,
                    role         : "user",
                    phoneNumber  : "-",
                    address      : "-",
                    createdAt    : await config.time()
                })
                config.response(res, 201, "success register", createUser)

            } else {
                config.response(res, 400, "success, email already use.")
            }
            
        } catch (error) {
            config.response(res, 400, error.message)
        }
    },

    forgotPassword : async (req, res, next) => {
        try {
            const findEmail = await userModels.findOne({ email: req.body.email })
            if(findEmail !== null) {
                const signJwt = await jwt.sign({
                    name  : findEmail.name,
                    email : findEmail.email,
                    role  : findEmail.role
                }, process.env.SECRET_KEY)

                const msgForgotPass = 
                    `<span>
                        Klik link berikut ini untuk melalukan perubahan password : <a href="${process.env.URL_CHANGE_PASS_USER}/${signJwt}">Ganti Password</a>
                    <span>
                    <br/><br/><br/>
                    <span>Hormat kami, <b>e-comerce</b></span>`

                config.mail(findEmail.email, "Verifikasi lupa password", msgForgotPass).then(() =>{
                    config.response(res, 200, "success, link verification sent.")
                }).catch(err => {
                    config.response(res, 400, err)
                })
            } else {
                config.response(res, 400, "failed, email is not register in our database.")
            }
            
        } catch (error) {
            config.response(res, 400, error.message)
        }
    },

    confirmPassword : async (req, res, next) => {
        try {
            const token     = jwtDecode(req.body.token)
            const findEmail = await userModels.findOne({ email: token.email })
            if(findEmail !== null) {
                const hashPassword = await bcrypt.hashSync(req.body.password, salt)
                const change = await userModels.updateOne({ _id: findEmail._id }, {
                    password : hashPassword
                })
                const msgConfirmPass = 
                    `<span>
                        Password sukses di perbarui pada <b>${moment(await config.time()).format("D MMM YYYY. HH:mm")}(GMT+7)</b>, silakan login kembali ke akun anda.
                    <span>
                    <br/><br/><br/>
                    <span>Hormat kami, <b>e-comerce</b></span>`

                config.mail(findEmail.email, "Password di perbarui", msgConfirmPass).then(() =>{
                    config.response(res, 200, "success, password change.", change)
                }).catch(err => {
                    config.response(res, 400, err)
                })

            } else {
                config.response(res, 400, "failed, email is not register in our database.")
            }
            
        } catch (error) {
            config.response(res, 400, error.message)
        }
    },

    changePassword : async (req, res, next) => {
        try {
            const findEmail = await userModels.findOne({ email: req.user.email })
            if(findEmail !== null) {
                const compareOldPassword = await bcrypt.compareSync(req.body.oldPassword, findEmail.password)
                if(compareOldPassword) {
                    const hashPassword = await bcrypt.hashSync(req.body.newPassword, salt)
                    const change = await userModels.updateOne({ _id: findEmail._id }, {
                        password : hashPassword
                    })
                    const msgConfirmPass = 
                        `<span>
                            Password sukses di perbarui pada <b>${moment(await config.time()).format("D MMM YYYY. HH:mm")}(GMT+7)</b>, silakan login kembali ke akun anda.
                        <span>
                        <br/><br/><br/>
                        <span>Hormat kami, <b>e-comerce</b></span>`

                    config.mail(findEmail.email, "Password di perbarui", msgConfirmPass).then(() =>{
                        config.response(res, 200, "success, password change.", change)
                    }).catch(err => {
                        config.response(res, 400, err)
                    })

                } else {
                    config.response(res, 400, "failed, old password is not match.")
                }
            } else {
                config.response(res, 400, "failed, email is not register in our database.")
            }
            
        } catch (error) {
            config.response(res, 400, error.message)
        }
    },


    // bank account
    addBankAccountUser : async (req, res, next) => {
        try {
            const addBank = await bankAccountModels.create({
                bank         : req.body.bank,
                addresNumber : req.body.addresNumber,
                ownerName    : req.body.ownerName,
                active       : true,
                createdAt    : await config.time()
            })
            config.response(res, 201, "success", addBank)
            
        } catch (error) {
            config.response(res, 400, error.message)
        }
    },
    updateBankAccountUser : async (req, res, next) => {
        try {
            const updateAddBank = await bankAccountModels.updateOne({ _id:req.body.id }, {
                bank         : req.body.bank,
                addresNumber : req.body.addresNumber,
                ownerName    : req.body.ownerName
            })
            config.response(res, 200, "success", updateAddBank)
            
        } catch (error) {
            config.response(res, 400, error.message)
        }
    },
    deleteBankAccountUser : async (req, res, next) => {
        try {
            const updateAddBank = await bankAccountModels.deleteOne({ _id:req.body.id })
            config.response(res, 200, "success", updateAddBank)
            
        } catch (error) {
            config.response(res, 400, error.message)
        }
    },
    getBankAccountUser : async (req, res, next) => {
        try {
            const getAddBank = await bankAccountModels.find().populate("bank_avaliable").exec()
            config.response(res, 200, "success", getAddBank)
            
        } catch (error) {
            config.response(res, 400, error.message)
        }
    },
    setActiveBankAccountUser : async (req, res, next) => {
        try {
            if(req.body.active !== "true" && req.body.active !== "false") {
                const setActiveBankAccount = await bankAccountModels.updateOne({ _id:req.body.id }, {
                    active : req.body.active
                })
                config.response(res, 200, "success", setActiveBankAccount)

            } else {
                config.response(res, 400, "failed, value must true or false")
            }
            
        } catch (error) {
            config.response(res, 400, error.message)
        }
    }
}

module.exports = clietControllers