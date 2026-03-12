const { Router } = require("express");
const index = Router();

// Render Homepage
index.get("/", (req, res) => {
  res.render("index", { title: "Welcome" });
});

module.exports = index;
