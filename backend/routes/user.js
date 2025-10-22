import express from "express";

import userController from "../controllers/usercontroller.js";
import authmiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", userController.createUser);

router.use(authmiddleware);


router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/:id", userController.newPassword);

export default router;