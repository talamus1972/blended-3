import "dotenv/config";
import express from "express";
import "./strategies/google.js";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";

const app = express();
const DB_URI = process.env.DB_URI;

app.use(
  session({ secret: "password", resave: false, saveUninitialized: true })
);

app.use(passport.initialize());

app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.get("/", (req, res) => {
  res.send(`<a href="/google">Login with Google</a>`);
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send("<a href='/logout'>logout</a>");
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("Goodbye");
  });
});

app.get("/google/failure", (req, res) => {
  res.send("Failed");
});

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/google/failure",
  })
);

async function run() {
  try {
    await mongoose.connect(DB_URI);
    console.info("Database connection successful");

    app.listen(3000, () => {
      console.log("Server is running on port: 3000");
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

run();
