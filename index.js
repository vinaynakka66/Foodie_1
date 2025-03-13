const express=require('express');
const app=express();
require('dotenv').config();
const mongoose=require('mongoose');
const vendorRoutes=require('./routes/vendorRoutes');
const bodyParser=require('body-parser');
const firmRoutes=require('./routes/firmRoutes');
const productRoutes=require('./routes/productRoutes');
const PORT=process.env.PORT||4000;

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("MongoDB Connected Successfully!");
})
.catch((error)=>{
    console.log("MongoDB Connection error:",error);
})
app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));

app.listen(PORT,()=>{
    console.log(`App is running at port ${PORT}`)
})

app.use('/',(req,res)=>{
    res.send(`<h1>Welcome to Supper</h1>`)
})