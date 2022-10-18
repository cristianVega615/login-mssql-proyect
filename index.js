const express = require("express");
const app = express();
const { create } = require("express-handlebars");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

require("./server/DB/DB");
require("dotenv").config();

const hbs = create({
  extname: ".hbs",
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

/*Rutas */
const home = require("./server/routes/home");
const login = require("./server/routes/login");
const signup = require("./server/routes/signup");
const indexHome = require("./server/routes/indexHome");

app.use("/", home);
app.use("/login", login);
app.use("/signup", signup);
app.use("/contact", indexHome);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {});
