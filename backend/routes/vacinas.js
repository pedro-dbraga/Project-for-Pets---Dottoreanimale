import express from "express"; 

import authmiddleware from "../middleware/auth.js";

import VacinasController from "../controllers/VacinaController.js";

const router = express.Router();

router.use(authmiddleware);

router.post("/:userid/pets/:petId/vacinas", VacinasController.createVacina);
router.get("/:userid/pets/:petId/vacinas", VacinasController.getVacinasByPetId);
router.get("/:userid/pets/:petId/vacinas/:id", VacinasController.getVacina);
router.put("/:userid/pets/:petId/vacinas/:id", VacinasController.updateVacina);
router.delete("/:userid/pets/:petId/vacinas/:id", VacinasController.deleteVacina);

export default router;