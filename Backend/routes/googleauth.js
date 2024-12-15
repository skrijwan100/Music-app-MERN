const exprees = require("express")
const router = exprees.Router()
const passport = require("passport")
const logout = require("passport")
const session = require("express-session");
require('dotenv').config();

router.get("/login/falid",(req,res)=>{
    res.status(400).json({"message":"Loing fail"})
})

router.get('/login/sucesss',(req,res)=>{
    if(req.user){
        res.status(200).json({
            "message":"Loing suessfully",
            "user":req.user,
        })
    }
    else{
        res.status(401).json({"message":"Unauthorized"})
    }
})

router.get("/google/callback", passport.authenticate('google', {
    successRedirect: process.env.FRONTEND_ORIGIN,
    failureRedirect: "/login/faild",

}))

router.get("/google",passport.authenticate("google",['profile',"email"]))

router.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error("Logout Error:", err);
        return res.status(500).json({ message: "Error logging out", error: err });
      }
      req.session.destroy((sessionErr) => {
        if (sessionErr) {
          console.error("Session Destruction Error:", sessionErr);
          return res.status(500).json({ message: "Error clearing session", error: sessionErr });
        }
        res.clearCookie("connect.sid"); // Clear the session cookie
        res.status(200).json({ message: "Logout successful" });
      });
    });
  });

module.exports=router;