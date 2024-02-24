const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    completed:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const todo=new mongoose.model('todo', Schema)

module.exports=todo