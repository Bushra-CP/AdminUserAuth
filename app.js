const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const nocache = require("nocache");
const auth = require("./middleware/auth");
const adminAuth = require("./middleware/adminAuth");

app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(nocache());

app.use(express.static(path.join(__dirname, "public")));

const adminLoginRoute = require("./routes/admin/adminLogin");
const adminDashboardRoute = require("./routes/admin/adminDashboard");
const adminLogoutRoute = require("./routes/admin/adminLogout");
const userLoginRoute = require("./routes/user/userLogin");
const userRegisterRoute = require("./routes/user/userSignup");
const userHomeRoute = require("./routes/user/userHome");
const userLogoutRoute = require("./routes/user/userLogout");

const connectDB = require("./db/db");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/home", auth.isLogin, adminAuth.isLogin, (req, res) => {
  res.render("./common/home");
});

app.use("/admin", adminLoginRoute);
app.use("/admin", adminDashboardRoute);
app.use("/admin", adminLogoutRoute);
app.use("/user", userLoginRoute);
app.use("/user", userRegisterRoute);
app.use("/user", userHomeRoute);
app.use("/user", userLogoutRoute);

connectDB();

app.listen(3000, () => {
  console.log("app listening");
});
