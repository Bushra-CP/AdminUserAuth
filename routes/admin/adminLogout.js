const express = require("express");
const router = express.Router();
const adminController = require("../../controller/adminController");
const adminAuth = require("../../middleware/adminAuth");

router.get("/logout", adminAuth.checkSession, adminController.logout);

module.exports = router;
