const redis = require("redis")
const client = redis.createClient({host:'0.0.0.0', port:'6379'})

//redis://localhost:6379
client.on('connect', function() {
    console.log('Connected!');
  });


const setJwt = (key, value) => {
    console.log(typeof key, typeof value)
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