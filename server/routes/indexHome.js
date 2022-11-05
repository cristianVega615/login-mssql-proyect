const express = require("express");
const router = express.Router();
const {bdConect} = require("../DB/DB")
const sql = require("mssql");



router.post("/", async (req, res, next) => {
    const {nameContact, phoneNumber} = req.body;

    let BD = await bdConect();
    let request = await BD.request();
    let idUser = req.user?.id


    request.query(`INSERT INTO contact (id, nameContact, phoneNumber) VALUES('${idUser}', '${nameContact}', '${phoneNumber}')`, (err,result) => {
        if(err) next(err);
        res.status(200).send("Good")
        
    }) 


})

router.get("/userContact/", async (req, res) => {
    let BD = await bdConect();
    let request = await BD.request();
    let idUser =  req.user?.id || 0

    let valuesGet = await request.query(`SELECT nameContact, phoneNumber FROM contact WHERE id='${idUser}'`)


    res.json(valuesGet.recordset)
    
   

})

router.post("/delete", async (req,res, ) => {
    let BD = await bdConect()
    let {nameContact, numberPhone} = req.body;
    let request = await BD.request();
    let idUser = req.user?.id || 0
    
    request.query(`DELETE FROM contact WHERE id='${idUser}' AND nameContact='${nameContact}'`, (err,result) => {
        if(err) next(err);
        res.status(200).send("Good")
    })

})


router.post("/update", async (req, res, next) => {
    let BD = await bdConect();
    let {contentName , contentPhone} = req.body;
    let request = await BD.request();
    let idUser = req.user?.id || 0;

    request.query(`UPDATE contact SET nameContact='${contentName}', phoneNumber='${contentPhone}' WHERE id=${idUser}` , (err, result) => {
        if(err) {next(err)}

        res.status(200)
    })

})

module.exports = router