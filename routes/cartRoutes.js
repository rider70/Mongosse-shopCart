const express = require("express");
const cartController = require("./../controllers/cartController");
const authController = require("./../controllers/authController");
const cartRouter = express.Router();
//routes
cartRouter
  .route("/")
  .all(authController.protect)
  .post(cartController.addCart);
cartRouter
  .route("/pay")
  .all(authController.protect)
  .post(cartController.payCarts);
cartRouter
  .route("/:id")
  .all(authController.protect)
  .delete(cartController.deleteProductCartById);


module.exports = cartRouter;