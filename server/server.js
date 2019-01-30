const express = require('express');
const bodyParser = require('body-parser');
const methodoverride=require("method-override");
const expresssanitizer= require("express-sanitizer");
const _ =require('lodash');



var {Items} = require('./db/models/item');
var {User} = require('./db/models/user');
var {mongoose} = require('./db/mongoose');
var {authenticate} = require('./middleware/authenticate');

var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.use(expresssanitizer());

var port = process.env.PORT || 3000;
var ejs= require('ejs');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/",(req,res)=>{
    res.render('home');
});

app.get("/index",(req,res)=>{
    Items.find().then(plants=>{
      res.render('index', {plants:plants});
    }).catch(e=>{
        res.status(400).send();
    });
});

app.get('/index/about', (req,res)=>{
    res.render('about');
});

app.get("/index/new", (req,res)=>{
     res.render('new');
 });

app.get("/index/:id",(req,res)=>{
        Items.find({name:req.params.id}).then((foundPlant)=>{
            if(!foundPlant){
                res.send('No Match found');
            }
            res.render('index', {plants:foundPlant});
        }).catch(e=>{
            res.status('400').send(e);
        });
    });
 
 app.post('/index', (req,res)=>{
    req.body.plant.description=req.sanitize(req.body.plant.description);
    Items.create(req.body.plant,function(err,cloth){
        if(err){
            res.send(err);
        }else{
            res.redirect("index");
        }
     });
});

app.get('/login', (req,res)=>{
    res.render('login');
});

// app.post('/login', (req,res)=>{
//     var body =_.pick(req.body, ['email','password']);
//     User.findByCredentials(body.email,body.password).then(user=>{
//         console.log("authtoken bngya");
//         return user.generateAuthToken();
        
//     }).then((token)=>{
//         console.log("token dediya");
//         res.header('x-auth', token).send(user);
//     }).catch(e=>{
//         console.log("error");
//         res.status(404).send();
//     });
// });



app.post('/signup',(req,res)=>{
    // var body =_.pick(req.body, ['email','password']);
    var user = new User({email:req.body.email,password:req.body.password});
    user.save().then(()=>{
        console.log("saved successfully");
        // res.redirect('login');
    },e=>{
        console.log("oops");
        res.status(400).send(e);});
});

app.get('/signup',(req,res)=>{
    res.render('signup');
});

// app.get('/index/account',authenticate, (req,res)=>{
//     var info = req.user;
//     res.render('account',{info});
// });

// app.get('/index/cart', authenticate, (req,res)=>{
//     var info =req.user.cart;
//     res.render('cart',{info});
// });

app.listen(port, () => {
     console.log(`server is on port: ${port}`);
 });


    
 



 //git add .
 //git commit -m "wdcjkwbdcj"
 //git push origin master