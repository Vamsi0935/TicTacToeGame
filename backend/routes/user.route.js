const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../utils/authMiddleware");

router.post("/signup", userController.registerUser);
router.post("/signin", userController.loginUser);
router.get("/profile", authMiddleware, userController.getUserProfile);
router.get("/list", authMiddleware, userController.getAllUsers);

module.exports = router;
