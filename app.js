const dotenv = require('dotenv');
const express = require('express')
const mongoose =require('mongoose')
const cors =require('cors')
const cookieParser = require('cookie-parser')
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config({path:'./config.env'});
require('./db/conn');

app.use(express.json());
app.use(cors());
app.use(cookieParser())
const User= require('./model/userSchema')

//link router files to routes easy

app.use(require('./router/auth'));






// app.get('/about',(req, res) => {
//     res.send(`Hello about world from server`)
//     console.log(`Hello my about`)
// })


// app.get('/contact', (req, res) => {
//     res.send(`Hello contact world from server`)
// })


app.get('/signin', (req, res) => {
    res.send(`Login`)
})


app.get('/signup', (req, res) => {
    res.send(`Registration`)
})

app.listen(PORT);