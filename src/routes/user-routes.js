import express from "express";
import { registerUser } from "../controllers/user-controllers";
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)

export default router