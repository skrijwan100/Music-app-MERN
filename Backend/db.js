const mongoose = require("mongoose")
const mongoURI='mongodb://localhost:27017/musicappDB'

connectserver=async()=>{
    try{
        await mongoose.connect(mongoURI)
        console.log('mongo is running')
    }catch(error){
        console.log(error)

    }

}
module.exports=connectserver;