const redis = require("redis")
const client = redis.createClient()

//redis://localhost:6379
client.on('connection', function() {
    console.log("welcome ");
  });


const setJwt = (key, value) => {
    client.on('connection', function() {
        console.log("welcome ");
      });
      
    console.log(typeof key, "wait")
    return new Promise((resolve, reject) => {
        try {
            client.set(key, value, (err, res)=>{
                if(err) reject(err)
                resolve(res)
            })
        } catch (error) {
            reject(error) 
        }
    })
}

const getJwt = (key) => {
    return new Promise((resolve, reject) => {

        try {
            client.get(key,(err, res)=>{
                if(err) reject(err)
                resolve(res)
            })
        } catch (error) {
            reject(error) 
        }
    })
}

module.exports = {
    setJwt,
    getJwt
}