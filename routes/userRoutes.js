const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const userRouter = express.Router();
//routes
userRouter
  .route("/")
  .all(authController.protect)
  .get(userController.getAllUser)
  .post(userController.addUser);

  userRouter
  .route("/:id")
  .all(authController.protect)
  .get(userController.getUserById)
  .put(userController.putUserById)
  .delete(userController.deleteUserById);

module.exports = userRouter;
