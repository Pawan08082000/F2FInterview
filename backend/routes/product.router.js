const controller = require("../controllers/product.controller");
const  authmiddleware  = require("../middlewares/auth.middleware");
const express = require("express");


const router = express.Router();

module.exports = [
  router.post(
    "/insert",
    authmiddleware.verifyToken,
    controller.insertProduct
  ),

  router.get("/show", authmiddleware.verifyToken, controller.getProduct),

  router.get("/get/:id", authmiddleware.verifyToken, controller.getProductById),
  router.get('/deleteProduct/:id',authmiddleware.verifyToken,controller.deleteProduct)
];
