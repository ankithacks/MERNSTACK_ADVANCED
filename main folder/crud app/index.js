require('dotenv').config()
const express = require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const todo=require('./routes/Todoroute')
const app=express()
const Schema=require('./models/tofo')

require('./db')

const PORT=process.env.PORT|| 8000

app.use(bodyparser.json())
app.use(cors())


app.get('/', (req, res)=>{
    res.json({message: "api working fine"})
})

app.use('/todos', todo)

app.listen(PORT, ()=>{
    console.log(`server started on ${PORT}`)
})