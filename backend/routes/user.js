import { Router } from "express";
import { signup } from "../controllers/signup_controllers.js";
import { signin } from "../controllers/signin_controllers.js";
import { updateUser } from "../controllers/updateUser.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.put("/", authMiddleware, updateUser);
router.post("/signup", signup);
router.post("/signin", signin);

export default router;