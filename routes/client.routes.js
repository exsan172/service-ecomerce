const express = require('express');
const router = express.Router();
const { body } = require("express-validator")
const verify = require("../middleware/jsonWebToken.middleware")
const clientControllers = require("../controllers/client.controllers")
const validator = require("../middleware/validator.middleware")

router.post('/register',
	body("name").notEmpty().withMessage("name is required."),
	body("email").notEmpty().withMessage("email is required.").isEmail().withMessage("please insert email format"), 
	body("password").notEmpty().withMessage("password is required.").isLength({ min:8 }).withMessage("password min length is 8"), validator, [
	clientControllers.register
]);

router.post('/login', 
	body("email").notEmpty().withMessage("email is required.").isEmail().withMessage("please insert email format"), 
	body("password").notEmpty().withMessage("password is required.").isLength({ min:8 }).withMessage("password min length is 8"), validator, [
	clientControllers.login
]);

router.post('/forgot-password',
	body("email").notEmpty().withMessage("email is required.").isEmail().withMessage("please insert email format"), validator, [
	clientControllers.forgotPassword
]);

router.post('/confirm-password', 
	body("password").notEmpty().withMessage("password is required.").isLength({ min:8 }).withMessage("password min length is 8"), validator, [
	clientControllers.confirmPassword
]);

router.post('/change-password', 
	body("oldPassword").notEmpty().withMessage("old password is required.").isLength({ min:8 }).withMessage("old password min length is 8"),
	body("newPassword").notEmpty().withMessage("new password is required.").isLength({ min:8 }).withMessage("new password min length is 8"), validator, verify, [
	clientControllers.changePassword
]);


// bank account
router.post('/bank-account', 
	body("bank").notEmpty().withMessage("bank is required."),
	body("addresNumber").notEmpty().withMessage("addresNumber is required."), 
	body("ownerName").notEmpty().withMessage("ownerName is required."), validator, verify, [
	clientControllers.addBankAccountUser
]);

router.put('/bank-account', 
	body("bank").notEmpty().withMessage("bank is required."),
	body("addresNumber").notEmpty().withMessage("addresNumber is required."), 
	body("ownerName").notEmpty().withMessage("ownerName is required."), validator, verify, [
	clientControllers.updateBankAccountUser
]);

router.delete('/bank-account', verify, [
	clientControllers.deleteBankAccountUser
]);

router.get('/bank-account', verify, [
	clientControllers.getBankAccountUser
]);

router.post('/active-bank-account', verify, [
	clientControllers.setActiveBankAccountUser
]);

module.exports = router;
