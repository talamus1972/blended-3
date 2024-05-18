import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send(`<a href="">Login with Google</a>`);
});

app.get("/protected", (req, res) => {
  res.send("protected route");
});

app.listen(3000, () => {
  console.log("server kuku");
});
