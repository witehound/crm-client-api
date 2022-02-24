const express = require("express")
const app = express()
const bodyparser = require('body-parser')
const cors = require("cors")
const helmet = require("helmet")


const port = process.env.PORT || 3001

app.use( "/", (req, res) => {
    res.json({message: "hi there you"})
}) 

app.listen (port,() => {
   console.log(`API is ready on https://localhost:${port}`)
})