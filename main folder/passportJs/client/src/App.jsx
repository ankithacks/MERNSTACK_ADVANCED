import NavBar from "./components/NavBar"
import './App.css'
import Home from "./pages/Home"
import Post from "./pages/Post"
import Login from "./pages/Login"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"

function App() {  
  // const user=false
  const [user, setUser]=useState(null)
  useEffect(()=>{
    const getUser=async()=>{
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials:"include",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            "Access-Control-Allow-Credentials": true
        }
      }) .then(respone=>{
        if(respone.status===200) return respone.json()
        throw new Error("authentication has failed")
      }).then(resObject=>{
        setUser(resObject.user)
      }).catch(err=> {
        console.log(err)
      })
    };
    getUser()
  },[])

  // console.log(user)
  return (
    <BrowserRouter>
      <div>
        <NavBar user={user}/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>} />
          <Route path="/post/:id" element={user ? <Post/> : <Navigate to="/login"/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
