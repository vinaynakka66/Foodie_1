const {verifyToken}=require('../middlewares/verifyToken');
const express=require('express');
const {addFirm,upload,deleteFirmById}=require('../controllers/firmController');
const router=express.Router();
router.post('/addfirm',upload.single('image'),verifyToken,addFirm);
router.delete('/deleteFirmById/:firmId',deleteFirmById);
router.get('/uploads/:imageName',upload);
module.exports=router;