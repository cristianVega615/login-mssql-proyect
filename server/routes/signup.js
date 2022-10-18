const express = require("express");
const router = express.Router();
const { bdConect } = require("../DB/DB")
const bcryptjs = require("bcrypt");


router.get("/", (req,res) => {
    res.render("signup")
})

router.post("/", async (req,res, next) => {
    const {username, password} = req.body;
    let passHash;

    try {
         passHash = await bcryptjs.hash(password, 10)
        
    } catch (err) {
        res.status(404)
        res.send({error : "No hay una contraseña dentro de este errore"})
    }



    const BD  = await bdConect();

       BD.request().query(`INSERT INTO info_users (userName, password) VALUES('${username}', '${passHash}')`, (err, result) => {
        if(err){next(err)}

    })
    
        let user = {
            userName : username
        }

       req.login(user, function(err){
        if(err) {return next(err)}

        res.redirect("/");
       })

})

module.exports = router