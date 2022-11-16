require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
require('dotenv').config()
require('./init_mogo')
const qrcode = require('qrcode')
const User = require('./model');
const { verifyAccessToken, signAccessToken } = require("./helpers/jwt_helpers");
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

app.post("/login", async function(request, response){
    try {
        
    const usermail = await request.body.email;
    const password = await request.body.password;

    const user = await User.findOne({email: usermail}, 
        async function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                if(foundUser.password === password){
                    const accessToken = await signAccessToken(user.id)
                    res.json({ accessToken }).render("qrcode")
                }else{
                    console.log(err);
                }
            }
        }
    });
} catch (error) {
   
    
}
}); 

app.get("/auth2", async(req, res) => {
    // const accessToken = await signAccessToken(user.id)
    // let input_text = `localhost:3000/accessToken?${accessToken}`;
    let input_text = 'https://hqstaff.newpatrioticparty.org/index.php?id=NPP-HQSTAFF-2022-0072';

    // const token = await verifyAccessToken(user.id)
    
    // if(!token) res.send('check token properly');
    
    qrcode.toFile('./qrcode.png', 'https://hqstaff.newpatrioticparty.org/index.php?id=NPP-HQSTAFF-2022-0040')

    // qrcode.toDataURL(input_text, (err, src) => {
    //     if(err) res.send('something is wrong');
    //     res.render( "qrcode", {
    //         qr_code: src
    //     });
    // })
})


//app.get("/admin", function(request, response){
//    response.render("admin")
//});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`port is running on ${PORT}`);
});