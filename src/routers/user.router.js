const express = require("express")
const { route } = require("./ticket.router")
const router = express.Router()
const { insertUser } = require("../model/user/user.model")
router.all('/', (req, res, next) => {
    res.json({mesage: "return from user router"})
})

router.post("/", async (req,res)=>{
    const result = await insertUser(req.body)
    console.log(result)
    res.json({mesage: "new user created", result})
})

module.exports = router