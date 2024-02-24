const mongoose=require('mongoose')


const Db= process.env.MONGO_URL;

mongoose.connect(Db).then(()=>{console.log("databse connected successfully")}).catch((error)=>{
    console.log(error)
})