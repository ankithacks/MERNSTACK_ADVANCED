const mongoose=require('mongoose')

const userschema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imgpath:{
        type: String,
        required: true
    },
    date:{
        type: Date
    }
})

const users=mongoose.model('user', userschema)

module.exports=users