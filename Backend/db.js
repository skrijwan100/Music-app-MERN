const mongoose = require("mongoose")
// const mongoURI=process.env.mongoURI
// const mongoURI='mongodb://localhost:27017/musicappDB'
const mongoURI='mongodb+srv://rijwansk329:SKRIJWAN%402006@clusterdb.7cmvf.mongodb.net/musicappDB'
// const mongoURI=process.env.mongoURI

connectserver=async()=>{
    try{
        await mongoose.connect(mongoURI)
        console.log(process.env.mongoURI)
        console.log('mongo is running')
    }catch(error){
        console.log(error)

    }

}
module.exports=connectserver;