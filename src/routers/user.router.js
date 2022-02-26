const express = require("express")
const { route } = require("./ticket.router")
const router = express.Router()
const { insertUser } = require("../model/user/user.model")
const { hashPassword } = require("../utils/bcrypt.helper")

router.all('/', (req, res, next) => {
    //res.json({mesage: "return from user router"})
    next()
})

router.post("/", async (req,res)=>{
    const { name, company, address, phone, email, password} = req.body
    try {
        const hashedPass = await hashPassword(password)

        const newUserObj = {
            name, company, address, phone, email, password: hashedPass,
        }
        const result = await insertUser(newUserObj)
        console.log(result)
        res.json({mesage: "new user created", result: result})
    } catch (error) {
        res.json({satus: "error", message: error.message})
    }
    
})

module.exports = router