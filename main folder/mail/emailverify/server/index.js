// require('dotenv').config()
// const express=require('express')
// const cors=require('cors')

// const userRoutes=require('./routes/users')
// const authRoutes=require('./routes/auth')

// // database:-
// const connection=require('./db')
// connection()
// const app=express()
// const PORT=process.env.PORT || 5000

// // mdidllewares:-
// app.use(express.json())
// app.use(cors())

// // routes-
// app.use("api/users", userRoutes)
// app.use("api/auth", authRoutes)

// app.listen(PORT, ()=>{
//     console.log(`server started oin port ${PORT}`)
// })


require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get('/', (req,res)=>{
    res.send("welcome ")
})

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));