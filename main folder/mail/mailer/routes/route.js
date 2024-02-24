const Router=require('express').Router()
const {signup, getbill}=require('../controller/appcontroller.js')

Router.post('/user/signup',signup)
Router.post('/product/getbill', getbill)

module.exports=Router