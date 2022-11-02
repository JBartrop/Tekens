require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
require('dotenv').config()
require('./init_mogo')
const qrcode = require('qrcode')
const User = require('./model')
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


// const mongoose = require("mongoose");
//const session = require("express-session");
// mongoose.connect("mongodb://localhost:27017", {useNewUrlParser: true});

// const userSchema = ({
//     email: String,
//     password: String
// })

// const User = mongoose.model("User", userSchema);




//ROUTES INITS 
app.get("/", function(request, response){
    response.render("home");
});

app.get("/register", function(request, response){
    response.render("register")
})

app.post("/register", function(request, response){
    const newUser = new User({
        email : request.body.email,
        password : request.body.password
    })

    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
            response.render("admin");
        }
    });

});

app.get("/login", function(request, response){
    response.render("signin")
});

app.post("/login", function(request, response){
    const usermail = request.body.email;
    const password = request.body.password;

    User.findOne({email: usermail}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                if(foundUser.password === password){
                    response.render("admin")
                }else{
                    console.log(err);
                }
            }
        }
    });
}); 



app.get("/auth2", (req, res) => {
    let input_text = 'Hey boy!!!';
    qrcode.toDataURL(input_text, (err, src) => {
        if(err) res.send('something is wrong');
        res.render( "qrcode", {
            qr_code: src
        });
    })
})

//app.get("/admin", function(request, response){
//    response.render("admin")
//});


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`port is running on ${PORT}`);
});