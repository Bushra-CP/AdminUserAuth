const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

router.get("/home", auth.checkSession, auth.isUserExist, (req, res) => {
  const name = req.session.user.name;
  res.render("user/userHome", { name });
});

module.exports = router;
