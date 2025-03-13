const express = require('express');
const path = require('path');
const { addProduct, upload, getProductByFirm, deleteProductById } = require('../controllers/ProductController');

const router = express.Router();

router.post('/addProduct/:firmId', upload.single('image'), addProduct);
router.get('/getProductByFirm/:firmId', getProductByFirm);
router.delete('/deleteProductById/:productId', deleteProductById);

router.get('/uploads/:imageName', (req, res) => {
    const imagePath = path.join(__dirname, '../uploads', req.params.imageName);
    res.sendFile(imagePath);
});

module.exports = router;
