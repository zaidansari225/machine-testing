const express=require('express');
const router=express.Router();
const productController=require('../controller/productController');
router.post('/add-product',productController.addProduct);
router.get('/fetch-product',productController.fetchAllProduct);
router.post('/fetch-productById',productController.fetchProductById);
router.post('/delete-product',productController.deleteProduct);
router.post('/update-product',productController.updateProduct);
module.exports=router;