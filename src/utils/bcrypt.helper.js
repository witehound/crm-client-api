const bycrypt = require("bcrypt")
const saltRounds = 10


const hashPassword = plainPassword => {
    return new Promise(resolve =>{
        resolve(bycrypt.hashSync(plainPassword, saltRounds))
    })
}

const unHashPassword = (plainPassword, passFromDb) => {
    return new Promise((resolve, reject)=>{
        bycrypt.compare(plainPassword, passFromDb, function(err,result){
           if (err){
               reject(err)
           }
           resolve(result)
        })
    })
}

module.exports = {
    hashPassword,
    unHashPassword
}