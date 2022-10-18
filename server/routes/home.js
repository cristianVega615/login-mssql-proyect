const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    if(!req.user) {
        return res.render("home")}
    next();
}, (req, res) => {
    res.render("index", {user : req.user.username})
})


module.exports = router





