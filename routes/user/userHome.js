const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

router.get("/home", auth.checkSession, (req, res) => {
  const name = req.session.userName;
  res.render("user/userHome", { name });
});

module.exports = router;
