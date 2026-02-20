import TasksService from '../service/PetsTasksService.js';

async function createTask(req, res) {
    const userId = req.user.id;
    const familyId = req.params.familyId;
    const petId = req.params.petId;
    const { activity, status, when } = req.body;

    try {   

        const activitResult = await TasksService.createTask(familyId,userId, petId, activity, status, when);
        
        res.status(200).json(activitResult);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTasks(req, res) {
    const userId = req.user.id;
    const tasktId = req.params.taskId;
    try {   
        const tasks = await TasksService.getTask(tasktId, userId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllTasksByUser(req, res) {
    
    const userId = req.user.id;

    try {   
        const tasks = await TasksService.getAllTasksByUser(userId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllTasksByFamily(req, res) {
    const userId = req.user.id;
    const familyId = req.params.familyId;
    try {   
        const tasks = await TasksService.getAllTasksByFamily(userId, familyId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateTask(req, res) {
    const taskId = req.params.taskId;
    const userId =req.user.id;

    const {activity, status, when } = req.body;
    try {   
        const updatedTask = await TasksService.updateTask(taskId, userId, activity, status, when);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteTask(req, res) {
    const taskId = req.params.taskId;
    const userId = req.user.id;

    try {   
        const deletedMessage = await TasksService.deleteTask(taskId, userId);
        res.status(200).json({ message: deletedMessage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default { createTask , getTasks, getAllTasksByUser, getAllTasksByFamily, updateTask,deleteTask};