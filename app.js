require('dotenv').config()
var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");
const Bean = require("./models/bean");
const Potatoe = require("./models/potatoe");
const Rice = require("./models/rice");
// const Crop = require('./models/crop');

var app = express();

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

let uri = process.env.MONGO_URI
uri = uri.replace('<user>', process.env.MONGO_USER)
uri = uri.replace('<password>', process.env.MONGO_PASS)

mongoose.connect(uri).then(() => console.log('connected')).catch(console.err);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use(require("express-session")({
    secret: "four ravens in a circle",
    resave: false,
    saveUninitialized: false
}));

// app.use(passport.initialized());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//Routes

//showing the home page
app.get("/", async (req, res) => {
    const users = JSON.stringify( await User.find())
    res.render("home", {users});
});


// //showing registration page
app.get("/register", function(req, res){
    res.render("register");
});

//handling user registration
app.post("/register", function (req, res) {
    console.log(req.body)
    var fullName = req.body.fullName
    // var idNo = req.body.idNo
    var region = req.body.region
    var password = req.body.password
    const user = new User({name: fullName, region: region, password: password})
    user.save()
    // res.json({"status": 200})
    res.redirect("/warehouse");
});

//showing the warehouse page
app.get("/warehouse", function(req, res){
    res.render("warehouse");
});

// //handling the warehouse
// app.post("/warehouse", function (req, res) {
//     console.log(req.body)
//     var cropName = req.body.cropName
//     var Amount = req.body.amount
//     var Price = req.body.finalPrice
//     const crop = new Crop({crop: cropName, amount: Amount, price: Price})
//     crop.save()

//     res.json({"status":200})
// });

//handling the crops
//beans

app.get("/bean", function(req, res){
    res.render("bean")
});

app.post("/bean", function (req, res){
    console.log(req.body)
    var amount = req.body.amount
    var price = req.body.finalPrice
    const bean = new Bean({amount: amount, price: price})
    bean.save()

    res.redirect("/end");
    // res.json({"status":200})
});

//potatoes

app.get("/potatoe", function (req, res){
    res.render("potatoe")
});

app.post("/potatoe", function (req, res){
    console.log(req.body)
    var amount = req.body.amount
    var price = req.body.finalPrice
    const potatoe = new Potatoe({amount: amount, price: price})
    potatoe.save()

    res.redirect("/end");
    // res.json({"status":200})
});

//rice

app.get("/rice", function (req, res){
    res.render("rice")
});

app.post("/rice", function (req, res){
    console.log(req.body)
    var amount = req.body.amount
    var price = req.body.price
    const rice = new Rice({amount: amount, price: price})
    rice.save()

    res.redirect("/end");
    // res.json({"status":200})
});

//showing the final page
app.get("/end", function(req, res){
    res.render("end")
});

//showing the login page
app.get("/login", function (req, res){
    res.render("login");
})

//handling user login
app.post("/login", passport.authenticate("local", {
    successRedirect: "/warehouse",
    failureRedirect: "/login"
}),function (req, res){

});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server has started")
});


