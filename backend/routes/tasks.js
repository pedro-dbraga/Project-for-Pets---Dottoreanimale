import express from "express"; 

const router = express.Router();

import authmiddleware from "../middleware/auth.js";

import PetsTasks from "../controllers/petsTasksController.js";


router.use(authmiddleware);

router.post("/families/:familyId/pets/:petId/createtask", PetsTasks.createTask);

router.get("/:taskId/taskinfos", PetsTasks.getTasks);
router.get("/listalltasksfromuser", PetsTasks.getAllTasksByUser);
router.get("/families/:familyId/listalltasks", PetsTasks.getAllTasksByFamily);

router.put("/:taskId/updateTask", PetsTasks.updateTask);

router.delete("/:taskId/deletetask", PetsTasks.deleteTask);

export default router;