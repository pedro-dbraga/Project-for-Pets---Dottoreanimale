import express from "express"; 

const router = express.Router();

import authmiddleware from "../middleware/auth.js";

import FamilyController from "../controllers/FamilyController.js";


router.use(authmiddleware);



router.post("/createfamily", FamilyController.createFamily);

router.get("/getfamilies", FamilyController.getFamilyByUserId);

router.patch("/:familyId", FamilyController.updateFamily);

router.delete("/:familyId/delete", FamilyController.removeFamily);




export default router;