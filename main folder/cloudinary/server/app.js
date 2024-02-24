// require("dotenv").config()
// require("./db/conn")


// const express =require('express')
// const app=express()


// const cors=require('cors')
// // router file imported herre;-
// const router=require("./routes/Router")


// const PORT=4004;


// app.use(express.json())
// app.use(cors)
// // middleware of router fuile:-
// app.use(router)


// app.listen(PORT,()=>{
//     console.log(`server started at port ${PORT}`)
// })


require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");

const cors = require("cors");
const router = require("./routes/router");
const port = 4004;


app.use(express.json());
app.use(cors());
app.use(router);


app.listen(port,()=>{
    console.log(`server start at port no ${port}`)
})