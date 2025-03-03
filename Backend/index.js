require('dotenv').config();
const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
const cors = require('cors')
const server= require("./db")
const cookiessession= require("cookie-session")
const passport= require("passport")
const passportSetUp= require("./passport")
const session = require("express-session");
// const PORT = process.env.PORT ;
server()
app.use(express.json())
app.use(cookieParser());
// app.use(
//   cookiessession({
//     name:"session",
//     keys:['skrijwan'],
//     maxAge:24*60*60*100,
//   })
// )
app.use(
  session({
    secret: 'skrijwan', // Replace with a secure random string
    resave: false, // Don't save the session if unmodified
    saveUninitialized: false, // Don't create a session until something is stored
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: `${process.env.FRONTEND_ORIGIN}`,  // Allow requests only from frontend
  methods: 'GET, POST, PUT, DELETE', // Allow specific methods
  allowedHeaders: 'Content-Type, Authorization, auth-token, admin-token', // Add allowed headers
  credentials: true, // Allow credentials like cookies or authentication headers
}));
app.get('/', (req, res) => {
  res.send({
    "name":"rijwan"
  })
})
app.use("/nweuser/userauth",require("./routes/userauth"))
app.use("/allsong/manupulatesong",require("./routes/songs"))
app.use("/songtrack/favsong",require("./routes/favsong"))
app.use("/auth",require("./routes/googleauth"))
                                                      
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})

    
