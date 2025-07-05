const express = require("express");
const router = express.Router();
const userController = require("../../controller/userController");
const auth = require("../../middleware/auth");

router.get("/signup", auth.isLogin, (req, res) => {
  res.render("./user/userSignup");
});

router.post("/signup", userController.registerUser);

module.exports = router;
