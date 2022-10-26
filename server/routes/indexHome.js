const express = require("express");
const router = express.Router();
const {bdConect} = require("../DB/DB")
const sql = require("mssql");



router.post("/", async (req, res, next) => {
    const {nameContact, phoneNumber} = req.body;

    let BD = await bdConect();
    let request = await BD.request();
    let idUser = req.user?.id


    request.query(`INSERT INTO contact (id, nameContact, phoneNumber) VALUES('${idUser}', '${nameContact}', '${phoneNumber}')`, (err, result)=>{
        if(err) return next(err)
    }) 

    

    
})

router.get("/userContact/", async (req, res, next) => {
    let BD = await bdConect();
    let request = await BD.request();
    let idUser =  req.user.id

    let valuesGet = await request.query(`SELECT nameContact, phoneNumber FROM contact WHERE id=${idUser}`, (err, result) => {
        if(err) {return next(err)}

        res.json(result.recordset)
    })
    
   

})


module.exports = router