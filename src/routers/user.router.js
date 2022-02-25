const express = require("express")
const router = express.Router()

router.all('/', (req, res, next) => {
    res.json({mesage: "return from user router"})
})

router.post("/", (req,res)=>{
    res.json(req.body)
})

module.exports = router