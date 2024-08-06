const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const path = require("path");
var routes = require('./route/routes');
const cors = require('cors');

app.use(cors(
    {   origin: ['http://localhost:3000', 'https://estateclient.onrender.com'],
        methods: ['POST','GET','PUT','DELETE'],
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200,}
));
app.use(express.json({limit:"10mb"}))

app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({
    secret: 'estate',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}
))

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

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

app.use(routes);