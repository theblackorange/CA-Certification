const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const auth = require('../auth')
const codingModel = require('../models/CodingModel');
const { json } = require('body-parser');

router.post('/codingUsername',auth, function(req,res){
    const newCoder= new codingModel(
        {
            _id:new mongoose.Types.ObjectId(),
            userName:req.body.username
        }
    );
    newCoder.save()
    .then(coder=>{
        res.json(coder).status(201);
    })
    .catch(err=>{
        res.json(err).status(500)
    })
})

router.get('/:username',auth, function(req,res){
    const uname=req.params.username;
    codingModel.find({userName:uname})
    .exec()
    .then(details=>{
        res.json(details).status(200)
    })
    .catch(err=>{
        res.json(err).status(500)
    })
})

router.put('/:username',auth, function(req,res){
    codingModel.update({userName:req.params.username},
        {$set: {hackerRank:req.body.hackerRank,
                hackerEarth: req.body.hackerEarth,
                spoj: req.body.spoj,
                github: req.body.github,
                bitBucket: req.body.bitBucket,
                gitLab: req.body.gitLab,
                kaggle: req.body.kaggle,
                skills: req.body.skills    
            }})
        .exec()
        .then( details=>{
            res.json(details).status(200)
        })
        .catch(err=>{
            res.json(err).status(500)
        })
})

module.exports=router