const UserSchema = require("./user.schema")

const insertUser = userObj => {
    UserSchema(userObj)
    .save()
    .then(data => console.log(data))
    .catch(error => console.log(error))

}

module.exports =  {
    insertUser
}