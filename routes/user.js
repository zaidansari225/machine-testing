const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
router.post('/add-user',userController.addUser);
router.post('/login',userController.login);
router.post('/post',userController.posts);
module.exports=router;