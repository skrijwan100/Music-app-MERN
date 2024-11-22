const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
const cors = require('cors')
const server= require("./db")
// const PORT = process.env.PORT ;
server()
app.use(express.json())
app.use(cookieParser());
require('dotenv').config();
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests only from frontend
  methods: 'GET, POST, PUT, DELETE', // Allow specific methods
  allowedHeaders: 'Content-Type, Authorization, auth-token,admin-token', // Add allowed headers
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

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})

