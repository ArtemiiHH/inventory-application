const { Router } = require("express");
const index = Router();
const userController = require("../controllers/userController");

index.get("/", userController.getUser);

module.exports = index;
