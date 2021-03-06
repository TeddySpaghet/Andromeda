const express = require('express');
const layouts = require('express-ejs-layouts');
const path = require('path');
// const flash = require('connect-flash');
const db = require('./models');
// const session = require('express-session')
//middleware
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(express.json());

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true
//   }))

// app.use(flash());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    console.log("I am in post")
    console.log(req.body)
    db.user.create({
        name: req.body.name,
        email: req.body.email,
    }).then((user) => {
            if (!user) throw Error()
            // req.flash('success', "Welcome, and thank you for registering with us!")
            
            res.redirect('/')
    }).catch((error) => {
            // req.flash('error', "Sorry but somehow you F***'d this up...");
            console.log("couldn't make user")
    })
});

app.use('/admin', require('./routes/admin'));

const server = app.listen(process.env.PORT || 3000, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 3000}🎧`));

module.exports = server;