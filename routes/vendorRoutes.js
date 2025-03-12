
const {vendorRegister,vendorLogin,getAllVendors,getVendorById}=require('../controllers/vendorController');
const express=require('express');
const router=express.Router();

router.post('/register',vendorRegister);
router.post('/login',vendorLogin);
router.get('/getAllVendors',getAllVendors);
router.get('/getVendorById/:id',getVendorById);
module.exports=router;