const express = require("express");
const router = express.Router();
const {bdConect} = require("../DB/DB")
const sql = require("mssql");



router.post("/", async (req, res, next) => {
    const {nameContact, indexDiv ,phoneNumber} = req.body;

    let BD = await bdConect();
    let request = await BD.request();
    let idUser = req.user?.id


    request.query(`INSERT INTO contact (id, div_content ,nameContact, phoneNumber) VALUES('${idUser}', '${indexDiv}' ,'${nameContact}', '${phoneNumber}')`, (err,result) => {
        if(err) next(err);
        res.status(200).send("Good")
        
    }) 


})

router.get("/userContact/", async (req, res) => {
    let BD = await bdConect();
    let request = await BD.request();
    let idUser =  req.user?.id || 0

    let valuesGet = await request.query(`SELECT nameContact, phoneNumber, div_content FROM contact WHERE id='${idUser}'`)


    res.json(valuesGet.recordset)
    
   

})

router.post("/delete", async (req,res, ) => {
    let BD = await bdConect()
    let {nameContact, indexDiv , numberPhone} = req.body;
    let request = await BD.request();
    let idUser = req.user?.id;

    request.query(`DELETE FROM contact WHERE id='${idUser}' AND div_content='${indexDiv}'`, (err,result) => {
        if(err) next(err);
        res.status(200).send("Good")
    })

})


router.post("/update", async (req, res, next) => {
    let BD = await bdConect();
    let {contentName , indexDiv ,  contentPhone} = req.body;
    let request = await BD.request();
    let idUser = req.user?.id;

    request.query(`UPDATE contact SET nameContact='${contentName}', phoneNumber='${contentPhone}' WHERE id=${idUser} and div_content='${indexDiv}'` , (err, result) => {
        if(err) {next(err)}

        res.status(200)
    })

})

module.exports = router