const mongoose=require('mongoose');

const CodingSchema=mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        userName:{
            type:String,
            required:true,
            unique:true
        },
        hackerRank:
        {
            type:String,
            rquired:true
        },
        hackerEarth:{
            type:String
        },
        spoj:{
            type:String
        },
        github:{
            type:String,
            required:true
        },
        gitBucket:{
            type:String
        },
        gitLab:{
            type:String
        },
        kaggle:{
            type:String
        },
        skills:{
            type:[String],
            required:true
        }
    }
);

module.exports=mongoose.model('coding',codingSchema);