const mongoose=require('mongoose')
require('dotenv').config()

const MONGO_URL=process.env.MONGO_URL


mongoose.connect(MONGO_URL,{
    dbName:'usercloud'
}).then(()=>{
    console.log("mongodb connected")
}).catch((error)=>{
    console.log("error", error)
})