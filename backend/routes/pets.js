import express from "express"; 

const router = express.Router();

import petsController from "../controllers/petscontroller.js";
import authmiddleware from "../middleware/auth.js";

router.use(authmiddleware);
// adicionar pet
router.post("/:userid/pets", petsController.createPet);
//atualizar pet
router.put("/:userid/pets/:id", petsController.updatePet);
// listar pets
router.get("/:userid/pets", petsController.getPets);
// buscar 1 pet por id
router.get("/:userid/pets/:id", petsController.getPetById);
// deletar pet
router.delete("/:userid/pets/:id", petsController.deletePet);


export default router;