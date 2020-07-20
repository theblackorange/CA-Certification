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
        },
        hackerEarth:{
            type:String
        },
        spoj:{
            type:String
        },
        github:{
            type:String,
        },
        bitBucket:{
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
        }
    }
);

module.exports=mongoose.model('coding',CodingSchema);