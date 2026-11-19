import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";

let router = express.Router();
// register route
// /register POST
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
