const express = require("express")
const { route } = require("./ticket.router")
const router = express.Router()
const { insertUser, getUserByEmail } = require("../model/user/user.model")
const { hashPassword, unHashPassword } = require("../utils/bcrypt.helper")
const { createAccessJwt, createRefreshJwt} = require("../utils/jwt.helper")

router.all('/', (req, res, next) => {
    //res.json({mesage: "return from user router"})
    next()
})

//create new user router
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

//sign in router
router.post("/login", async (req,res)=>{
    const { email, password } = req.body
   
    if (!email || !password){
        return res.json({status:"error", message:"invalid form submission"})
    }
     //get user with eamil fromdb
    const user = await getUserByEmail(email)

    //grab id from user match in db
    const passFromDb = user && user._id ? user.password : null

    if(!passFromDb)
    return res.json({status:"error", message:"incorrect form"})

    //comapre password
    const result = await unHashPassword(password,passFromDb)

    //user endpoint
    if (!result){
        res.json({status: "error", message: "incorrect email or password"})
    }
   const accessJWT = await createAccessJwt(user.email, `${user._id}`)

   const refreshJWT = await createRefreshJwt(user.email)

    res.json({status: "login success", accessJWT, refreshJWT})
})



module.exports = router