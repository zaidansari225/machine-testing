const User=require('../models/user');
const jwt=require('jsonwebtoken');
const sha1=require('sha1');
const middleware=require('../middleware/users');
exports.addUser=(async (req,res) => {
try{
const {name,email,password}=req.body;
const data=await User.findUserByEmail(email);
if(data.length!==0){
        return res.json({
            message:"Email Id Already exist",
            success:false,
            status:404
        })
    }
else
{
    
        let user={}
      
     
        user['name']=name;
        user['email']=email;
        user['password']=sha1(password);
        console.log(user)
        const result=await User.addUser(user);
        console.log(result.affectedRows)
        if(result.affectedRows){
            return res.json({
                message:"User Add Successfully",
                status:200,
                success:true
            });
        }
    
    
    }



}catch(err){
    return res.json({
     status:500,
     message:"Internal Server Error",
     success:false   
    })
}
});
exports.login=(async (req,res,next) => {
    try{
const {email,password}=req.body;
const result=await User.findUserByEmail(email);
if(result.length!=0){
if(result[0]['email']!=email){
    return res.json({
        message:"Email Not Found",
        status:400,
        success:false
    })
}else{
    console.log(result[0])
    const storedUser=result[0];
    const pass=storedUser['password']
    const hash=sha1(password)
    console.log(password)
    console.log(pass)
    const response=hash===pass
        console.log(response)
        if(response==true){
            const token=jwt.sign({
                email:storedUser['email'],
                id:storedUser['id']
            },'secretForToken',{ 
                expiresIn:'1h'
            })
            return res.json({
                message:"Login successful",
                status:200,
                success:true,
                token:token,
                id:storedUser['id'],
                email:storedUser['email']
            });
            
        }else{
            return res.json({
                message:"Password Not Correct",
                success:false,
                status:400
            })
        }
    
}

}else{
return res.json({
    message:"User Not Registered",
    success:false,
    status:400
});
}
    }catch(err){
        return res.json({
           message:"Internal Server Error",
           status:500,
           success:false 
        });
    }
})
exports.posts=( middleware.verifyToken ,async (req,res) => {
jwt.verify(req.token,'secretForToken',(err,authData) => {
if(err){
  return  res.sendStatus(403)
}else{
  return res.json({
      message:"Post Created",
      authData
  })  
}
});
});
