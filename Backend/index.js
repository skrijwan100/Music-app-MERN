const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
const server= require("./db")
const port = 5000
server()
app.use(express.json())
app.use(cookieParser());
require('dotenv').config();
app.get('/', (req, res) => {
  res.send({
    "name":"rijwan"
  })
})
app.use("/nweuser/userauth",require("./routes/userauth"))
app.use("/allsong/manupulatesong",require("./routes/songs"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

