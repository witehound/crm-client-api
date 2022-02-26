const bycrypt = require("bcrypt")
const saltRounds = 10


const hashPassword = plainPassword => {
    return new Promise(resolve =>{
        resolve(bycrypt.hashSync(plainPassword, saltRounds))
    })
}

module.exports = {
    hashPassword
}