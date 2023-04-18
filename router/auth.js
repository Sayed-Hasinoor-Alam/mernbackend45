const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const authenticate =require('../middleware/authenticate');


require("../db/conn")
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send(`Hello world from server router js`)
})




//using async await 

router.post('/register', async (req, res) => {

    const {name, email, phone , work, password, cpassword }=req.body;

    if(!name || !email || !phone || !work || !password ||!cpassword){
        return res.status(422).json({ error: "Plz filled the field properly" });
    }
        try {

  const userExist = await User.findOne({ email: email });
  
  if(userExist){
    return res.status(422).json({ error: "email already exists"});
    }
    else if(password != cpassword){
        return res.status(422).json({ error: "password doesnt match "});

    }
    else {
        const user=new User({ name, email, phone, work, password,cpassword });

     await user.save();

      
        res.status(201).json({message: "User registered successfully"});
       
    }
        } catch (err) {

            console.log(err);
        }


    
    
})


//login route validation

router.post('/signin', async(req,res) => {

   try {
    const {email, password}= req.body;
        if(!email || !password){
            return res.status(400).json({ error: "plz fill the data"});
        }
        const login= await User.findOne({ email: email})

        // console.log(login);
        if(login){
            const datamatch= await bcrypt.compare(password, login.password);

                const token= await login.generateAuthToken();
                console.log(token);

                res.cookie("jwtoken", token,{
                    expires:new Date(Date.now() +2589200000),
                    httpOnly:true
                })

            if(!datamatch)
            {
                res.status(400).json({error: "User error successfully"})
            }
            else {
            res.json({message: "User logged in successfully"})
            }
        }
        else{
            res.status(400).json({error: "User error successfully"})
        }
       
   } catch (err) {
    console.log(err);
   }
})

//about us 

router.get('/about',authenticate , (req, res) => {
    res.send(req.rootUser);
    
})

//for contact page
router.get('/getdata',authenticate , (req, res) => {

    res.send(req.rootUser);
})

//contact page

router.post('/contact', authenticate, async (req, res) => {
    try{

        const {name,email,phone,message }=req.body;

        if(!name || !email || !phone || !message){
            return res.json({error: "plz fill the form"})
        }

            const userContact = await User.findOne({_id:req.userID });

            if(userContact){
                const userMessage= await userContact.addMessage(name, email, phone, message)

                await userContact.save();

                res.status(201).json({ message: "user conatct saved successfully"})
            }

    }catch (err) {



    }
})

//logout

router.get('/logout', (req, res) => {
    console.log('logout')
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send('User logged out');
    
})


module.exports = router;
