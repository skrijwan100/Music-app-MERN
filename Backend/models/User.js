const mongoose=require("mongoose")
const { Schema } = mongoose;
const newuser=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
})
module.exports=mongoose.model('User',newuser);