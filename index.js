const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const user=require('./routes/user');
const product=require('./routes/product');
const cart=require('./routes/cart');

app.use(cors())
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.header("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Accept, X-Custom-Header,Authorization')
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
      next();
    
    });
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
        extended:true
    }));
    app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(express.json())
app.use('/user',user);
app.use('/product',product);
app.use('/cart',cart);
app.get('/',(req,res) => {
res.send("Hello Node js Project")
})
app.listen(3000,() => console.log("The Server is listening on port 3000"))