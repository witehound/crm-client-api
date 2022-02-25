const express = require("express")
const app = express()
const bodyparser = require('body-parser')
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")

//handle error
const handleError = require("./src/utils/errorhandler")

//API security
app.use(helmet())

//Handle cors error external api
app.use(cors())

app.use(morgan("tiny"))

//set body parser to req json
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

//my port
const port = process.env.PORT || 3001

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