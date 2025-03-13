const { verifyToken } = require('../middlewares/verifyToken');
const express = require('express');
const path = require('path');
const { addFirm, upload, deleteFirmById } = require('../controllers/firmController');

const router = express.Router();

router.post('/addfirm', upload.single('image'), verifyToken, addFirm);
router.delete('/deleteFirmById/:firmId', deleteFirmById);


router.get('/uploads/:imageName', (req, res) => {
    const imagePath = path.join(__dirname, '../uploads', req.params.imageName);
    res.sendFile(imagePath);
});

module.exports = router;
