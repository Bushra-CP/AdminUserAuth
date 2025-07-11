const User = require("../model/userModel");

const checkSession = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/user/login");
  }
};

const isLogin = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/user/home");
  }
  next();
};

const isUserExist = async (req, res, next) => {
  try {
    const email = req.session?.user?.email;

    if (!email) {
      // No session, redirect to login
      return res.redirect("/user/login");
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      // User no longer exists in DB
      req.session.destroy((err) => {
        if (err) {
          return res.redirect("/user/login");
        }
        res.clearCookie("connect.sid"); // clear session cookie
        return res.redirect(
          "/user/signup?message=User doesn't exist..! Account deleted..!"
        );
      });
    } else {
      next(); // user exists, continue
    }
  } catch (err) {
    console.error("Error in isUserExist middleware:", err);
    res.status(500).send("Internal server error");
  }
};

module.exports = { checkSession, isLogin, isUserExist };
