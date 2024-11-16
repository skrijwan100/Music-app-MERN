const adminauth=process.env.Admin_auth_token
const fecthadmin=(req,res,next)=>{
    try {
    const admintoken= req.header('admin-token')
    if(admintoken!=adminauth){
        return res.status(401).json({"message":"Unauthorized"})
    }
   next()
} catch (error) {
    console.log(error)
    return res.status(500).send("intarnal server error.")
        
}
   
}
module.exports=fecthadmin;