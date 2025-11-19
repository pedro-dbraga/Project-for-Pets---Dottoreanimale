import express from "express";

import authmiddleware from "../middleware/auth.js";

import adminController from "../controllers/admController.js";

const router = express.Router();

router.post("/", adminController.CreateAdmin);

router.use(authmiddleware);

router.get("/metrics/petcount", adminController.MetricPetBySpecies);
router.get("/metrics/sterelized", adminController.MetricSterelized);
export default router;