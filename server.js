const express = require("express");
const session = require("express-session");
const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");

const app = express();
const PORT = 3000;
const csvFilePath = "users.csv";

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
    session({
        secret: "secretKey",
        resave: false,
        saveUninitialized: true,
    })
);

// Read Users from CSV
const readUsers = async () => {
    return new Promise((resolve, reject) => {
        const users = [];
        fs.createReadStream(csvFilePath)
            .pipe(csv.parse({ headers: true }))
            .on("data", (row) => users.push(row))
            .on("end", () => resolve(users))
            .on("error", (error) => reject(error));
    });
};

// Write Users to CSV
const writeUsers = (users) => {
    const ws = fs.createWriteStream(csvFilePath);
    csv.write(users, {
        headers: ["name", "email", "password", "phone", "city", "gender"],
        writeHeaders: true,
    }).pipe(ws);
};

// Routes
app.get("/", (req, res) => res.redirect("/register"));

// Register Page
app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { name, email, password, phone, city, gender } = req.body;
    let users = await readUsers();

    if (users.find((user) => user.email === email)) {
        return res.send("User already exists! <a href='/login'>Login here</a>");
    }

    const newUser = { name, email, password, phone, city, gender };
    users.push(newUser);
    writeUsers(users);

    res.redirect("/login");
});

// Login Page
app.get("/login", (req, res) => res.render("login"));

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let users = await readUsers();
    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) return res.send("Invalid credentials! <a href='/login'>Try again</a>");

    req.session.user = user;
    res.redirect("/dashboard");
});

// Dashboard Page
app.get("/dashboard", (req, res) => {
    if (!req.session.user) return res.redirect("/login");
    res.render("dashboard", { user: req.session.user });
});

// Edit Profile Page
app.get("/edit-profile", (req, res) => {
    if (!req.session.user) return res.redirect("/login");
    res.render("edit-profile", { user: req.session.user });
});

// Update Profile
app.post("/update-profile", async (req, res) => {
    if (!req.session.user) return res.redirect("/login");

    const { name, email, phone, city, gender } = req.body;
    let users = await readUsers();

    users = users.map((user) =>
        user.email === req.session.user.email
            ? { ...user, name, email, phone, city, gender }
            : user
    );

    writeUsers(users);
    req.session.user = users.find((user) => user.email === email);
    res.redirect("/dashboard");
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
