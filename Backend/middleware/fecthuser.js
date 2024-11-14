const jwt=require('jsonwebtoken')
const jwt_secret=process.env.JWT_SECRET_CODE;

const fecthuser=(req,res,next)=>{
    try {
        
  
    // const authtoken=req.cookie['auth-token']
    const authtoken = req.cookies['auth-token'];
    if(!authtoken){
        return res.status(404).json({"error":"inavid auth token"})
    }
    const data= jwt.verify(authtoken,jwt_secret)
    console.log(data)
    req.user=data.user
    next()
} catch (error) {
    console.log(error)
    res.status(500).json({"error":"Intarnal server error"})
}


}
module.exports=fecthuser