const express=require('express');
const router=express.Router();
const cartController=require('../controller/cartController');
router.post('/add-cart',cartController.addCart);
router.get('/fetch-cart',cartController.fetchAllCart);
router.post('/fetch-cartById',cartController.fetchCartById);
router.post('/delete-cart',cartController.deleteCart);
router.post('/update-cart',cartController.updateCart);
module.exports=router;