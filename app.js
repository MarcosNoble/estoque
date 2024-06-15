//carregando modulos
const express = require('express')
const { engine } = require('express-handlebars');
const bodyParser = require("body-parser")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
require("./config/auth")(passport)
const db = require("./config/db")
require("./models/Usuario");
const Usuario = mongoose.model("usuarios");
// require("./models/Postagem")
// const Postagem = mongoose.model("postagens")
//require("./models/Categoria")
//const Categoria = mongoose.model("categorias")
//const admin = require('./routes/admin')
//const usuarios = require("./routes/usuario")


//Configurações
//sessão
    app.use(session({
        secret: "qualquerCoisaSegura",
        resave: true,
        saveUninitialized: true
    }))
    //a ordem importa
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
//Middleware
    app.use((req,res,next)=>{
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null;
        next()
    })
//Bodyparser
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
//Handlebars
    app.engine('handlebars', engine({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');
//mongoose        
    mongoose.Promise = global.Promise;
    mongoose.connect(db.mongoURI, {
    }).then(() => {
        console.log("conectado ao MongoDB Atlas");
    }).catch((err) => {
        console.log("falha na conexão ao MongoDB Atlas: " + err);
    });
//public
    app.use(express.static(path.join(__dirname, "public")))