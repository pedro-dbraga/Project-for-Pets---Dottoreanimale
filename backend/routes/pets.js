import express from "express"; 

const router = express.Router();

import authmiddleware from "../middleware/auth.js";

import petsController from "../controllers/petscontroller.js";


router.use(authmiddleware);

router.post("/families/:familyId/createpet", petsController.createPet);

router.get("/:id", petsController.getPetById);
router.get("/listallpets", petsController.getPets);
router.get("/families/:familyId", petsController.ListAllPetsFromAFamily);

router.put("/:id/update", petsController.updatePet);
router.patch("/:id/changename", petsController.changePetName);
router.patch("/:id/families/:familyId/addfamily", petsController.PutPetInAFamily);

router.delete("/:id/delete", petsController.deletePet);



export default router;