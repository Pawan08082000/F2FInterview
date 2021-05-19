const express = require("express");
const authmiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const auth = require("../controllers/auth.controller");

module.exports = [
  router.post("/signup", authmiddleware.checkDuplicateEmail, auth.signup),
  router.post("/login", auth.login),
];
