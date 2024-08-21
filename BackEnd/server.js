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
const multer = require("multer")
const nodemailer = require("nodemailer");
const MemoryStore = require('memorystore')(session)

app.use(cors(
    {   origin: ['http://localhost:3000', 'https://estate-psi-three.vercel.app'],
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
        expires: new Date(Date.now() + 3600000),
        maxAge: 3600000 // 1 lhour
        // 24 * 60 * 60 * 1000 // 24 hours
    },
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
}
))

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

dotenv.config({path: path.resolve(__dirname, '.env')})
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

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE_HOST,
    port: process.env.EMAIL_SERVICE_PORT,
    auth: {
        user: process.env.AUTH_SERVICE_USER,
        pass: process.env.AUTH_SERVICE_PASSWORD,
    }
})

// Create multer upload instance
const upload = multer();
app.post("/send-bulk-emails",upload.array("files"),async(req,res)=>{
    const {to, subject, message} = req.body;
    const files = req.files
    const attachments = 
        files.map((file) => {
            return(
                { 
                    filename: file.originalname, 
                    content: file.buffer
                })
            })
    
    const mailOptions = {
        from: process.env.AUTH_SERVICE_USER,
        bcc: to,
        subject: subject,
        html: message,
        attachments: attachments
    }

    await transporter.sendMail(mailOptions).then((error, info)=>{
        if(error){
            return res.send({success:false,msg: error});
        } else {
            return res.send({success:true,msg:"Email sent: "+info.response});
        }
    })
})

// mongo connecction
connectDB();

app.use(routes);