const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://cacerti:cacerti@cluster0.1ldb9.mongodb.net/cacerti?retryWrites=true&w=majority',{useNewUrlParser:true});

const user=require('./routes/user');
app.use('/user',user);


app.get('/',function(req,res)
{
    res.send("Server Started")
})


app.listen(8000,function(req,res){
    console.log("Server started at port 8000")
})