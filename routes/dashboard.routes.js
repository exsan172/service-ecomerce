const express = require('express');
const router = express.Router();
const verify = require("../middleware/jsonWebToken.middleware")
const uploads = require("../middleware/multer.middleware")
const dashboardControllers = require("../controllers/dashboard.controllers")

router.get('/update-provice', [
	dashboardControllers.updateProvice
]);

router.get('/update-city', [
	dashboardControllers.updateCity
]);


router.post('/check-cost', [
	dashboardControllers.checkCost
]);
router.get('/shipping-method', [
	dashboardControllers.getPaymentMethod
]);
router.post('/shipping-method', [
	dashboardControllers.createPaymentMethod
]);
router.delete('/shipping-method', [
	dashboardControllers.deletePaymentMethod
]);
router.put('/shipping-method', [
	dashboardControllers.updatePaymentMethod
]);


router.get('/payment-method', [
	dashboardControllers.getPaymentMethod
]);
router.post('/payment-method', [
	dashboardControllers.createPaymentMethod
]);
router.delete('/payment-method', [
	dashboardControllers.deletePaymentMethod
]);
router.put('/payment-method', [
	dashboardControllers.updatePaymentMethod
]);


router.post('/bank-avaliable', uploads.single("bank-images"), verify, [
	dashboardControllers.createBankAvaliable
]);
router.put('/bank-avaliable', [
	dashboardControllers.updateBankAvaliable
]);
router.get('/bank-avaliable', [
	dashboardControllers.getBankAvaliable
]);
router.delete('/bank-avaliable', [
	dashboardControllers.deleteBankAvaliable
]);

module.exports = router;
