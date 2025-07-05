const express = require("express");
const router = express.Router();
const adminController = require("../../controller/adminController");
const adminAuth = require("../../middleware/adminAuth");

router.get("/dashboard", adminAuth.checkSession, adminController.getDashboard);
router.post("/users", adminController.createUser);
router.post("/userEdit/:id", adminController.editUser);
router.post("/userDelete/:id", adminController.deleteUser);

module.exports = router;
