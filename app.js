require("dotenv").config()
const express = require("express")
const app = express()
const bodyparser = require('body-parser')
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const mongoose = require("mongoose")

//my port
const port = process.env.PORT || 3001

//handle error
const handleError = require("./src/utils/errorhandler")

//API security
app.use(helmet())

//Handle cors error external api
app.use(cors())

app.use(morgan("tiny"))

//mongodb connection setup
mongoose.connect(process.env.MONGO_URL, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

if (process.env.NODE_ENV !== "production"){
    const mDb = mongoose.connection
    mDb.on("open", () => {
    console.log("mongodb is connected")
   })
   mDb.on("erroe", (error) => {
    console.log(error)
   })
   app.use(morgan("tiny"))
}


//set body parser to req json
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())



//load routers
const userRouter = require("./src/routers/user.router")
const ticketRouter = require("./src/routers/ticket.router")

//use routers
app.use("/v1/user", userRouter)
app.use("/v1/ticket", ticketRouter)

app.use((req, res, next) => {
    const error = new Error("Resource is not found")
    error.status = (404) 
    next(error)
}) 

app.use((error,req,res,next) =>{
    handleError(error,res)
})

app.listen (port,() => {
   console.log(`API is ready on https://localhost:${port}`)
})