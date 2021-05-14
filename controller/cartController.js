const Cart=require('../models/cart');
exports.addCart=(async (req,res) => {
try{
const {name,price,description,user_id}=req.body;
console.log(req.body)
const result=await Cart.findCartByName(name);
if(result.length!=0){
    return res.json({
        message:"Product already exist in cart",
        status:400,
        success:false
    });
}else{
    let cart={}
    cart['name']=name;
    cart['price']=price;
    cart['description']=description;
    cart['user_id']=user_id;
    console.log(cart)
    const result=await Cart.addCart(cart);
    console.log(result)
    if(result.affectedRows){
        return res.json({
            message:"Cart Add Successfuly",
            status:200,
            success:true
        });
    }else{
        return res.json({
            message:"Cart Not Added",
            status:400,
            success:false
        });
    }
}
}
catch(err){
return res.json({
    message:"Internal Server Error",
    status:500,
    success:false
})
}
});
exports.fetchAllCart=(async (req,res) => {
try{
const result=await Cart.findAllCart();
if(result.length!=0){
    return res.json({
        message:"Cart Fetch Successful",
        status:200,
        success:true,
        data:result
    });
}else{
    return res.json({
message:"Not Fetch",
status:400,
success:false

    });
}
}
catch(err){
    return res.json({
  message:"Internal Server Error",
  status:500,
  success:false
    });
}
});
exports.fetchCartById=(async (req,res) => {
try{
const {user_id}=req.body;
console.log(req.body)
const result=await Cart.findCartById(user_id);
if(result.length!=0){
return res.json({
message:"Fetch Cart Successful",
status:200,
success:true,
data:result
});
}else{
return res.json({
message:"Not Fetch",
status:400,
success:false
});
}
}
catch(err){
return res.json({
    message:"Internal Server Error",
    success:false,
    status:500
});
}
});
exports.deleteCart=(async (req,res) => {
try{
const {id}=req.body;
const data=await Cart.findCartById(id);
if(data.length!=0){
    const result =await Cart.deleteCartById(id);
    if(result.affectedRows){
        return res.json({
            message:"Cart Delete Successful",
            status:200,
            success:true,
        });
    }else{
        return res.json({
            message:"Not Deleted",
            success:false,
            status:400
        });
    }
}else{
    return res.json({
        message:"Cart Not available To delete",
        success:false,
        status:400
    });
}

}
catch(err){
    return res.json({
message:"Internal Server Error",
status:500,
success:false
    });
}
});
exports.updateCart=(async (req,res) => {
try{
const {id,name,price,desc}=req.body;
const result=await Cart.findCartById(id);
if(result.length!=0){
const response=await Cart.updateCartById(name,price,desc,id);
if(response.affectedRows){
    return res.json({
message:"Update Cart Successful",
status:200,
success:true
    });
}else{
    return res.json({
  message:"Not Updated",
  status:400,
  success:false
    });
}
}else{
    return res.json({
 message:"Cart Not exist",
 success:false,
 status:400
    });
}
}catch(err){
    return res.json({
message:"Internal Server Error",
success:false,
status:500
    });
}
});