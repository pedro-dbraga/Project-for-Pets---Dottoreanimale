import express from "express";

import userController from "../controllers/usercontroller.js";
import authmiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/createuser", userController.createUser);

router.use(authmiddleware);


router.get("/infos", userController.getUserById);

router.patch("/newinfos", userController.updateUser);
router.patch("/newPassword", userController.newPassword);

router.delete("/delete", userController.deleteUser);


export default router;