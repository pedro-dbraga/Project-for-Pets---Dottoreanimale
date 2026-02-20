import express from "express"; 

import authmiddleware from "../middleware/auth.js";

import VacinasController from "../controllers/VaccineController.js";

const router = express.Router();

router.use(authmiddleware);

router.post("/pets/:petId/createvaccine", VacinasController.createVacina);

router.get("/:id/pets/:petId", VacinasController.getVaccineById);
router.get("/pets/:petId", VacinasController.getVacinasByPetId);

router.put("/:id/pets/:petId/update", VacinasController.updateVacina);

router.delete("/:id/pets/:petId/delete", VacinasController.deleteVacina);

export default router;