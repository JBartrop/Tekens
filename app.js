require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
require('dotenv').config()
require('./init_mogo')
const qrcode = require('qrcode')
const User = require('./model');
const { verifyAccessToken, signAccessToken } = require("./helpers/jwt_helpers");
const { findById } = require("./model");
const { Types } = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


//ROUTES INITS 
app.get("/", function(request, response){
    response.render("home");
});

app.get("/register", function(request, response){
    response.render("register")
})

app.post("/register", async function (request, response){
    const newUser = new User({
        email : request.body.email,
        password : request.body.password
    })
    const savedUser = await newUser.save()
    const accessToken = await signAccessToken(savedUser.id)
    response.render("signin")


});

/***
PORT=3000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=tekens
ACCESS_TOKEN_SECRET=735428094d5f8da49f4688f279cd417727ee82db633295c8728b460e691aedad
REFRESH_TOKEN_SECRET=9bb759392a9fed78535c209cb170c495b1de0fbfb4a2ad932243701e4627d3d9
 
***/



app.get("/login", function(request, response){
    response.render("signin")
});

app.post("/login", async function(request, response){
    try {
        
    const email = await request.body.email;
    const password = await request.body.password;
    
    const user = await User.findOne({email: email});
    if (!user) console.log("Wrong Email")

    const isMatch = await user.isValidPassword(password)
    if(!isMatch) {
        console.log("Wrong password")
    }else{
        //const accessToken = await signAccessToken(user.id)
       const id = await user.id 
        console.log(id)
        let input_text = `http://localhost:3000/${id}`;
        await qrcode.toDataURL(input_text, (err, src) => {
            if(err) response.send('something is wrong');
            //response.send(input_text)
            response.status(200).render("qrcode", {qr_code: src });
        // response.redirect("/auth2")
        // response.json({accessToken});
        }
)}
const userlog = await request.params.id    
const isScanned = request.params.isScanned
// setInterval(() => {
//         if(isScanned !== true) {
//          response.render("admin");
//     }else{
//         console.log ("You fucking don't know what the heck you're doing ;)")
//     }
// }, 4000);

} catch (error) {}
}); 

app.get("/qrcode", async function(req, res, next){
    res.render("qrcode")
})

app.put("/:id", async function(req, res, next) {
   try {
    const getID =  req.params.id
    console.log(getID)
    if(!getID){
       res.send('Wrong token')
    } else{
        await User.findByIdAndUpdate(getID, {isScanned: true});
       res.send("you got it")
    }
   } catch (error) {
    
   }
   })

app.get("/admin", function(request, response){
   response.render("admin")
});

app.get("/create", function(request, response){
    response.render("create")
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`port is running on ${PORT}`);
});