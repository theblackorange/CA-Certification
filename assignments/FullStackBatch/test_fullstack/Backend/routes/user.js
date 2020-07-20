const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const auth=require('../auth');
const userModel=require('../models/userModel');

router.post('/signup',function(req,res)
{
    const newUser=new userModel(
    {
        _id:new mongoose.Types.ObjectId(), 
        name:req.body.name,
        email:req.body.email,
        userName:req.body.userName,
        password:bcrypt.hashSync(req.body.password,7),
        education:"",
        workExperience:"",
        following:[]
    }
);
newUser.save()
.then(user=>{res.json(user).status(201);})
.catch(err=>{res.json(err).status(500);})
})

router.put('/:username',auth,function(req,res){
    const uname = req.params.username;
    const educate = req.body.education;
    const workExp = req.body.workExperience;
    userModel.updateOne({userName : uname},{$set:{education : educate, workExperience : workExp}})
    .exec()
    .then(user => {
        res.json(user).status(200);
    })
    .catch(err => {
        res.json(err).status(500);
    })
})

router.get('/:username',auth, function(req,res){
    const uname=req.params.username;
    userModel.find({userName:uname})
    .exec()
    .then(details =>{
        res.json(details).status(200);
    })
    .catch(err => {
        res.json(err).status(500);
    })
})

router.put('/follow/:username',auth, function(req,res){
    const uname=req.params.username;
    const usernameFollowed=req.body.usernameFollowed;
    userModel.update({userName:uname},{$push: {following:[usernameFollowed]}})
    .exec()
    .then(updatedDetails=>{
        res.json(updatedDetails).status(200);
    })
    .catch(err=>{
        res.json(err).status(500);
    })
    
})


router.post('/login',function(req,res){
    userModel.find({userName: req.body.userName})
    .exec()
    .then(details=>{
        if(details.length==0){
            res.json("Incorrect UserName or Password").status(401);
        }else if(bcrypt.compareSync(req.body.password,details[0].password)){
            //res.json(details).status(200);

            const token = jwt.sign(
                {
                    email:details[0].email,
                },'theblackorange',
                {
                    expiresIn:'24h'
                }
            )
            res.json(
                {
                    "message":"Auth Successful",
                    "token":token
                }
            ).status(200);

        }else{
            res.json("Incorrect Username or Password").status(401);
        }
    })
    .catch(err=>{
        res.json(err).status(500);
    })
    
})
module.exports=router;