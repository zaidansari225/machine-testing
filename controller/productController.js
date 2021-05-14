const Product=require('../models/product');
const db = require('../utils/database');
exports.addProduct=(async (req,res) => {
try{
const {name,price,desc,user_id}=req.body;
const result=await Product.findProductByName(name);
if(result.length!=0){
    return res.json({
        message:"Prroduct Already Exist",
        status:400,
        success:false
    });
}else{
    let product={}
    product['name']=name;
    product['price']=price;
    product['description']=desc;
    product['user_id']=user_id;
    const result=await Product.addProduct(product);
    if(result.affectedRows){
        return res.json({
            message:"Product Add Successfuly",
            status:200,
            success:true
        });
    }else{
        return res.json({
            message:"Product Not Added",
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
exports.fetchAllProduct=(async (req,res) => {
try{
const result=await Product.findAllProduct();
if(result.length!=0){
    return res.json({
        message:"Product Fetch Successful",
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
exports.fetchProductById=(async (req,res) => {
try{
const {id}=req.body;
const result=await Product.findProductById(id);
if(result.length!=0){
return res.json({
message:"Fetch Product Successful",
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
exports.deleteProduct=(async (req,res) => {
try{
const {id}=req.body;
const data=await Product.findProductById(id);
if(data.length!=0){
    const result =await Product.deleteProductById(id);
    if(result.affectedRows){
        return res.json({
            message:"Product Delete Successful",
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
        message:"Product Not available To delete",
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
exports.updateProduct=(async (req,res) => {
try{
const {id,name,price,desc}=req.body;
const result=await Product.findProductById(id);
if(result.length!=0){
const response=await Product.updateProductById(name,price,desc,id);
if(response.affectedRows){
    return res.json({
message:"Update Product Successful",
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
 message:"Product Not exist",
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