const axios = require('axios')
const mongoose = require('mongoose')
const moment = require('moment-timezone')
const nodeMailer = require('nodemailer')

const requestApi = {
    get : async (path, header, data) => {
        return await axios({
            url : process.env.RAJAOGKIR+path,
            method : "GET",
            headers : header,
            params : data
        })
    },
    post : async (path, header, data) => {
        return await axios({
            url : process.env.RAJAOGKIR+path,
            method : "POST",
            headers : header,
            data : data
        })
    }
}

const response = (res, code, message, data=null) => {
    let dataJson = {
        statusCode : code, 
        message    : message,
    }

    if(data !== null) {
        dataJson["data"] = data
    }

    res.json(dataJson)
}

const databaseConnection = async () => {
    try {
        await mongoose.connect("mongodb://"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_NAME,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Database connection success.")

    } catch(err) {
        console.log("Database connection failed.")
    }
}

const time = async () => {
    return await moment().tz("Asia/Jakarta").utc(true)
}

const mail = async (to, subject, html) => {
    const transporter = await nodeMailer.createTransport({
        host : process.env.HOST_SMTP,
        port : process.env.PORT_SMTP,
        secure : process.env.SECURE_SMTP,
        auth : {
            user : process.env.USER_SMTP,
            pass : process.env.PASS_SMTP
        }
    })

    const mailOption =  {
        from    : process.env.USER_SMTP,
        to      : to,
        subject : subject,
        html    : html
    }

    return transporter.sendMail(mailOption)
}

module.exports = { requestApi, databaseConnection, response, time, mail }