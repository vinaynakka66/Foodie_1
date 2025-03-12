const express=require('express');
const {addProduct,upload,getProductByFirm,deleteProductById}=require('../controllers/ProductController')
const router=express.Router();

router.post('/addProduct/:firmId',upload.single('image'),addProduct);
router.get('/getProductByFirm/:firmId',getProductByFirm);
router.delete('/deleteProductById/:productId',deleteProductById);
router.get('/uploads/:imageName',upload);
module.exports=router;