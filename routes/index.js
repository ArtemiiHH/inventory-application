const { Router } = require("express");
const index = Router();

index.get("/", (req, res) => {
  res.render("index", { title: "Welcome" });
});

module.exports = index;
