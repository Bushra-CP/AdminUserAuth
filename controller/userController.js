const User = require("../model/userModel");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { name, email, pswd } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.redirect("/user/signup?message=User already exists!");
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(pswd, 10);

    // Create and save new user
    const newUser = new User({
      name,
      email,
      pswd: hashedPassword,
    });

    await newUser.save();

    // Success
    res.redirect("/user/login?success=Registered successfully! Login now");
  } catch (error) {
    console.log("Registration Error:", error);
    res.redirect("/user/signup?message=Something went wrong!");
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, pswd } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.redirect("/user/login?message=User does not exist!");
    }

    if (user.role !== "user") {
      return res.redirect("/user/login?message=Not authorized as user!");
    }

    const isMatch = await bcrypt.compare(pswd, user.pswd);

    if (!isMatch) {
      return res.redirect("/user/login?message=Incorrect password!");
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    return res.redirect("/user/home");
  } catch (error) {
    return res.redirect("/user/login?message=Something went wrong!");
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      //console.log("Logout error:", err);
      return res.redirect("/user/home");
    }
    res.clearCookie("connect.sid"); // ❗️Important to clear cookie
    res.redirect("/user/login?message=Logged out successfully");
  });
};


module.exports = { registerUser, userLogin, logout };
