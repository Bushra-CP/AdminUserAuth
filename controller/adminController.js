const bcrypt = require("bcryptjs");
const Admin = require("../model/userModel");

const adminLogin = async (req, res) => {
  try {
    const { email, pswd } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.redirect("/admin/login?message=Admin not found!");
    }

    if (admin.role !== "admin") {
      return res.redirect("/admin/login?message=Not authorized as admin!");
    }

    const isMatch = await bcrypt.compare(pswd, admin.pswd);
    if (!isMatch) {
      return res.redirect("/admin/login?message=Incorrect password!");
    }

    req.session.admin = admin;
    req.session.role = admin.role;
    req.session.adminName = admin.name;

    return res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.redirect("/admin/login?message=Something went wrong!");
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      //console.log("Logout error:", err);
      return res.redirect("/admin/dashboard");
    }
    res.clearCookie("connect.sid"); // ❗️Important to clear cookie
    res.redirect("/admin/login?message=Logged out successfully");
  });
};

const getDashboard = async (req, res) => {
  const search = req.query.search;
  let users = [];

  if (search) {
    users = await Admin.find({
      role: "user",
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    });
  } else {
    users = await Admin.find({ role: "user" }); // only show normal users
  }

  res.render("admin/adminDashboard", {
    name: req.session.adminName,
    users,
    search,
  });
};

// Create user from admin panel
const createUser = async (req, res) => {
  const { name, email, pswd } = req.body;
  const bcrypt = require("bcryptjs");

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(pswd, 10);

  await Admin.create({
    name,
    email,
    pswd: hashedPassword,
  });

  res.redirect("/admin/dashboard"); // redirect back to dashboard
};

//update user from adminDashboard
const editUser = async (req, res) => {
  const { name, email } = req.body;
  await Admin.updateOne({ _id: req.params.id }, { name, email });
  res.redirect("/admin/dashboard");
};

//delete user from adminDashboard
const deleteUser = async (req, res) => {
  const { name, email } = req.body;
  await Admin.deleteOne({ _id: req.params.id }, { name, email });
  res.redirect("/admin/dashboard");
};

module.exports = {
  adminLogin,
  logout,
  getDashboard,
  createUser,
  editUser,
  deleteUser,
};
