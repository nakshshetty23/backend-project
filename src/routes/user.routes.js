import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
// router.route("/login").post(login) // TODO: import login controller before enabling

export default router