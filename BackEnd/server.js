const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const path = require("path");
var routes = require('./route/routes');
const cors = require('cors');
const userModel = require('./src/users/userModel');

app.use(cors());
app.use(express.json({limit:"10mb"}))


app.get("/",async(req,res)=>{
    const data = await (await userModel.find().sort({_id:-1})).reverse()
    res.json({message: "All Image", data: data})
})


dotenv.config({path: path.resolve(__dirname, 'config.env')})
const PORT = process.env.PORT||8080

app.listen(PORT, function check(err){
    if(err)
    console.log('error')
    else
    console.log('started')
})


const connectDB = async()=>{
    try{
        // mongodb connection string
        // configure built-in role actions as "atlas admin" in cloud atlas mongoDB data access
        const con = await mongoose.connect(process.env.MONGO_URI,{
        })
        console.log(`MongoDB connected:${con.connection.host}`)
    } catch(err){
        console.log(err);
        process.exit(1);
    }
}


// mongo connecction
connectDB();

app.use(express.json());
app.use(routes);