const express=require('express')
const app=express()
const approute=require('./routes/route.js')
const PORT=5000

app.use(express.json())

app.use('/api', approute)

app.listen(PORT, ()=>{
    console.log("server started on port ")
})

// npm i mailgen