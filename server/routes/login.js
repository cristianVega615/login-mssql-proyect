const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {bdConect} = require("../DB/DB");
const bcryptjs = require("bcrypt")

const path = require("path");


passport.use(new LocalStrategy(async function verify(username, password, done){
    let BD = await bdConect();

    BD.request().query(`SELECT * FROM info_users WHERE userName='${username}'`, async (err, user) => {
        if(err){ return done(err)}
        if(!user.recordset) {return done(null,false, {message: "Incorrect username or passrword"})}

        let userParse = user.recordset[0];
        let pass = userParse?.password

        let compare = await bcryptjs.compare(password, pass, function(err, result){
            if(err || !result){
                return done(null, false)
            } else {

                return done(null,userParse)
            }
        })

    }) 
}))

passport.serializeUser(function(user, done){
    // console.log(user.recordset[0].userName)
    process.nextTick(function(){
        return done(null, {username: user.userName, id: user.id})

    })
})

passport.deserializeUser(function(user, done){

    process.nextTick(function(){
        return done(null, user)

    })

})




router.get("/", (req, res) => {
    res.render("login")
})
router.post("/", passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login",
}))


router.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err) {return next(err)}

        res.redirect("/")
    })
})


module.exports = router;