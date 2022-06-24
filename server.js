const express = require('express')
const app = express()
const mclient = require("mongodb").MongoClient

require('dotenv').config()
//import path module(core-module)
const path = require('path');
//connect build of react app with nodejs
app.use(express.static(path.join(__dirname,'./build')))

const DBconnection = process.env.DATABASE_CONNECTION_URL

//Connect with mongodb client
mclient.connect(DBconnection)
.then((client)=>{
    //Get DB object
    let dbobj = client.db("attendence_tracker")
    //Create collection objects
    let userDBobj = dbobj.collection("student")
    //let productDBobj = dbobj.collection("productcollection")
    
    app.set("userDBobj", userDBobj)
    //app.set("productDBobj", productDBobj)
    console.log('Connected')
})
.catch(err=>console.log("Error in DB connection", err))


const userApi = require('./API/userApi')
// const productApi = require('./API/productApi')
const { request } = require('express')
const { response } = require('express')

app.use('/user', userApi)
//app.use('/product', productApi)


//dealing page refresh
app.use('*', (request, response)=>{
    response.sendFile(path.join(__dirname, './build/index.html'))
})

app.use((request, response, next)=>{
    response.send({message: `path ${request.url} is invalid`})
})

app.use((error, request, response, next) =>{
    response.send({message: "Error Occured", reason: `${error.message}`})
})

const port = process.env.PORT
app.listen(port, ()=>console.log(`Server started at port ${port}`))



