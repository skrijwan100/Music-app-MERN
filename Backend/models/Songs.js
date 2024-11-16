const mongoose= require('mongoose')
const {Schema}= mongoose;

const song= new Schema({
    stitle:{
        type:String,
        require:true
    },
    artist:{
        type:String,
        require:true
    },
    coverImg:{
        type:String,
        require:true
    },
    duration:{
        type:Number,
        require:true
    },
    fileUrl:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model('Song',song);