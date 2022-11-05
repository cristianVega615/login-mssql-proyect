const express = require("express");
const router = express.Router();
const { bdConect } = require("../DB/DB");
const bcryptjs = require("bcrypt");

router.get("/", (req, res) => {
  res.render("signup");
});

router.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  let passHash;

  try {
    passHash = await bcryptjs.hash(password, 10);
    const BD = await bdConect();
  
    BD.request().query(
      `INSERT INTO info_users (userName, password) VALUES('${username}', '${passHash}')`,
      (err, result) => {
        if (err) {
          next(err);
        }
      }
    );

    let record = await BD.request().query(`SELECT * FROM info_users WHERE userName='${username}'`);
    let id = record.recordset[0].id;
    
    
    let user = {
      userName: username,
        id,
    };

    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
  
      res.redirect("/");
    });
  } catch (err) {
    res.status(404);
    res.send({ error: "No hay una contraseña dentro de este errore" });
  }


});

module.exports = router;
