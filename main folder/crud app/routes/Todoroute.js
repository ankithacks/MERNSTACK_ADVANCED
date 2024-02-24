const express=require('express')
const router=express.Router()

const Tofo=require('../models/tofo')

// http://localhost:8000/todos/test 
router.get('/test', (req,res)=>{
    res.json({message: "test the todo get router"})
})

// create todo:-http://localhost:8000/todos/post
router.post('/post', async(req,res)=>{
    try {
        const {title, description}= req.body
        const newTodo=new Tofo({
            title, description
        })
        await newTodo.save()
        res.status(200).json({message:"saved in data"})
    } catch (error) {
        res.status(404).json({message:"error in post"})
    }
})

// get all todo:-http://localhost:8000/todos/getalltodo
router.get('/getalltodo', async(req,res)=>{
    try {
        const todos=await Tofo.find()
        res.status(200).json({
            todos,
            message:"todos fetched successfully"
        })
    } catch (error) {
        console.log(error)
    }
})

// http://localhost:8000/todos/getalltodo/65b9de84bb60ae6eae7e524f
router.get('/getalltodo/:id', async(req,res)=>{
    try {
        const todo=await Tofo.findById(req.params.id)
        if(!todo){
            res.status(404).json({
                todo,
                message:"todos  was not fetched successfully"
            })
        }
        res.status(200).json({
            todo,
            message:"todo fetched"
        })
    } catch (error) {
        console.log(error)
    }
})

// update method:-http://localhost:8000/todos/updatetodo/65b9de84bb60ae6eae7e524f
router.put('/updatetodo/:id', async(req,res)=>{
    try {
        const {title, description}=req.body
        const todo=await Tofo.findByIdAndUpdate(req.params.id,{
            title,
            description
        })
        if(!todo){
            res.status(404).json({
                todo,
                message:"todos was not fetched successfully"
            })
        }
        res.status(200).json({
            todo,
            message:"todo updated"
        })
    } catch (error) {
        console.log(error)
    }
})


// delete:-http://localhost:8000/todos/delete/65b9de26bb60ae6eae7e524d
router.delete('/delete/:id', async(req,res)=>{
    try {
        const todo=await Tofo.findByIdAndDelete(req.params.id);
        if(!todo){
            res.status(404).json({
                message:"not deleted"
            })
        }
        res.status(200).json({
            message:"deleted  successfully"
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports=router