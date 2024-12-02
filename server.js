const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname)));

// Hardcoded credentials for testing
const users = {
  admin: { password: "admin123", role: "admin" },
  user1: { password: "user123", role: "user" },
};

// Route: Login Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/user-dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "user-dashboard.html"));
});

app.get("/admin-dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "admin-dashboard.html"));
});

// Route: Handle Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username].password === password) {
    const role = users[username].role;
    if (role === "admin") {
      res.json({ redirect: "/admin-dashboard" });
    } else {
      res.json({ redirect: "/user-dashboard" });
    }
  } else {
    res.json({
      error: "Invalid username or password. <a href='/'>Try again</a>",
    });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
