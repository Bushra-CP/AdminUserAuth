const express = require("express");
const router = express.Router();
const adminController = require("../../controller/adminController");
const adminAuth = require("../../middleware/adminAuth");

router.get("/login", adminAuth.isLogin, (req, res) => {
  res.render("./admin/adminLogin");
});

router.post("/login", adminController.adminLogin);

module.exports = router;
