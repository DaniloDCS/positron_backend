require("dotenv").config()
const express = require("express")
const app = express()
const bp = require("body-parser")
const port = process.env.PORT || 3333
const expressLayouts = require("express-ejs-layouts")
const firebase = require("firebase")
const Auth = require("./firebase")
var userLogged = null;

firebase.auth().onAuthStateChanged(user => {
    user ? userLogged = user : userLogged = null
})

app.use(expressLayouts)
app.use(bp.json())
app.use(bp.urlencoded())
app.use(express.static(__dirname + "/frontend/src/"))
app.use(express.static('node_modules/'));
app.set("view engine", "ejs")

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/", (req, res) => {
    userLogged === true ? res.render('pages/dashboard') : res.redirect('/signin')
})

app.get("/signin", (req, res) => {
    res.render('pages/signin')
})

app.get("/signup", (req, res) => {
    res.render('pages/signup')
})

app.post("/signup", (req, res) => {
    var { displayName, email, password, phoneNumber } = req.body

    if ( displayName && email && password && phoneNumber ) {
        Auth.SignUpWithEmailAndPassword(displayName, email, password, phoneNumber)
            .then(user => {
                user.err ? res.send("Error") : res.json(user)
            })
            .catch(err => {
                res.json(err)
            })
    } else {
        res.send("This is necessary all Date")
    }
})

app.post("/signin", (req, res) => {
    var { email, password } = req.body

    if (email && password) {
        Auth.SignInWithEmailAndPassword(email, password)
            .then(user => {
                if (user.err) {
                    res.send("Error")
                } else { 
                    userLogged = true
                    res.json(user)
                }
            })
            .catch(err => {
                res.json(err)
            })
    } else {
        res.send("This is necessary all Date")
    }
})

app.listen(port, () => {
    console.log(`\nRunning in localhost: http://127.0.0.1:${port}/`)
})