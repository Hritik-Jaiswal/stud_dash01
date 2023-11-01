const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { sequelize, Students} = require("./models")

const app = express();
app.use(express.json())

const passportSetup = require("./passport");
const authRoute = require("./routes/auth"); 
const db = require("./routes/student")
const localLogin = require('./routes/user')

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use('/students', db)
app.use("/auth", authRoute);
app.use('/user', localLogin)

app.listen("5000", async() => {
  console.log("Server is running on http://localhost:5000");
  await sequelize.authenticate()
  console.log("Database Connected")
});
