const jwt = require("jsonwebtoken")
const { getJwt, setJwt } = require("./redis.helper")

const createAccessJwt = async (email, _id) => {

    try {
        const accessJwt = await jwt.sign({email}, process.env.JWT_ACCESS_SECRET,
        {expiresIn: "15m"})

        await setJwt(accessJwt, _id)

        return Promise.resolve(accessJwt, _id)
    } catch (error) {
        return Promise.reject(error)
    }
    
}



const createRefreshJwt = (payload) => {
    const refreshJwt = jwt.sign({payload}, process.env.JWT_REFRESH_SECRET,
        {expiresIn: "30d"})

    return Promise.resolve(refreshJwt)
}


module.exports = {
    createAccessJwt,
    createRefreshJwt
}

