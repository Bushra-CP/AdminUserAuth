const express = require("express");
const router = express.Router();
const userController = require("../../controller/userController");
const auth = require("../../middleware/auth");

router.get("/login", auth.isLogin, (req, res) => {
  res.render("./user/userLogin", { message: req.query.message });
});
router.post("/login", userController.userLogin);

module.exports = router;
