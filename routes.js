// const express = require('express')
// const router = express.Router()
// const AuthController = require('../controllers/auth_controller')



// router.get("/register", function(request, response){
//     response.render("register")
// })

// router.post("/register", function(request, response){
//     const newUser = new User({
//         email : request.body.email,
//         password : request.body.password
//     })

//     newUser.save(function(err){
//         if(err){
//             console.log(err);
//         }else{
//             response.render("admin");
//         }
//     });

// });

// router.post("/login", function(request, response){
//     const usermail = request.body.email;
//     const password = request.body.password;

//     User.findOne({email: usermail}, function(err, foundUser){
//         if(err){
//             console.log(err);
//         }else{
//             if(foundUser){
//                 if(foundUser.password === password){
//                     response.render("admin")
//                 }else{
//                     console.log(err);
//                 }
//             }
//         }
//     });
// });

//  router.get("/login", function(request, response){
//     response.render("signin")
// })

// // router.delete('/logout', AuthController.logout)

// module.exports = router;
