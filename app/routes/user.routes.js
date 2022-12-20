const express = require("express");
const router = express.Router();

// controller that required
const userController = require("../controllers/user.controller");
const middlewares = require("../middlewares/authJwt");

// routes that availabel
router.post("/createUser", userController.createUser);
router.post("/signUp", userController.signUp);
router.get("/signIn", middlewares.verifyToken, userController.signIn);
router.get("/checkUser", userController.checkUser);
router.put("/updateUser", userController.updateUser);
router.delete("/deleteUser", userController.deleteUser);

module.exports = router;
