const mongoose=require('mongoose');

const userSchema=mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        userName:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        education:{
            type: String,
        },
        workExperience:{
            type: String,
        },
        following:{
            type:[String],
        }

    });
    module.exports=mongoose.model('user',userSchema);