const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const userModel=require('../models/userModel');

router.post('/signup',function(req,res)
{
    const newUser=new userModel(
    {
        _id:new mongoose.Types.ObjectId(), 
        name:req.body.name,
        email:req.body.email,
        userName:req.body.userName,
        password:req.body.password
    }
);
newUser.save()
.then(user=>{res.json(user).status(201);})
.catch(err=>{res.json(err).status(500);})
})




module.exports=router;