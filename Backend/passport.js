const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require('passport')
require('dotenv').config();

passport.use(
    new GoogleStrategy({
        clientID: process.env.Client_ID,
        clientSecret: process.env.Client_Secret,
        callbackURL: `/auth/google/callback`,
        scope: ["profile", "email"],

    },
    function (assessToken,refresToken,profile,callback){
        callback(null,profile)
    }

    )
)
passport.serializeUser((user,done)=>{
    done(null,user)

})
passport.deserializeUser((user,done)=>{
    done(null,user)
})
module.exports=passport