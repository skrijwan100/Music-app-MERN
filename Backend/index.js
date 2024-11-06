const express = require('express')
const app = express()
const server= require("./db")
const port = 5000
server()
app.get('/', (req, res) => {
  res.send({
    "name":"rijwan"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})