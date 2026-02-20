import TasksModel from "../models/petsTasksModel.js";
import UserModel from "../models/usersmodel.js"
import MemberModel from "../models/memberModel.js"
import PetsModel from "../models/petsmodel.js"
import authModel from "../models/authModel.js";

import pool from "../db.js";

async function createTask(familyId, userId, petId, activity,status, when){

    if (activity === 'bath home'){
        var xpPoints = 30;
         
    }
    if (activity === 'refill water'){
        var xpPoints = 5;
         
    }
    if (activity === 'wash'){
        var xpPoints = 10;
         
    }
    if (activity === 'clean'){
        var xpPoints = 8;
         
    }
    if (activity === 'feed'){
        var xpPoints = 5;
         
    } 
    if (activity === 'nail cut'){
        var xpPoints = 18;
         
    }
    if (activity === 'pet walker'){
        var xpPoints = 10;
         
    }
    if (activity === 'walk'){
        var xpPoints = 15;
    }

    if (activity === 'brush'){
        var xpPoints = 8;
    }

    if (activity === 'pet the pet'){
        var xpPoints = 5;
    }

    if (activity === 'play'){
        var xpPoints = 5;  
    }

    if (activity === 'bath petshop'){
        var xpPoints = 20;
    }

    try{

        const connection = await pool.getConnection();

        const canCreate = await authModel.checkIfUserIsAbleToCreateTask(userId, petId);

        if (!canCreate) {
            throw new Error("Usuario não autorizado!")
        }

        await TasksModel.createTask(userId, familyId, petId, activity,status, when, connection);

        if (status === "completed"){

            await UserModel.userXpGain(xpPoints, userId, connection);

            if(familyId  !== NULL){
                await MemberModel.memberXpGain(xpPoints, familyId, userId, connection);
            }

            await PetsModel.petXpGain(connection);
        }

    }catch{
        await connection.rollback();
        throw err;
    }finally{
        connection.release();
    }
}

async function getTask(taskId, userId){

    const result = await TasksModel.getTask(taskId, userId);

    return result;
}

async function getAllTasksByUser(userId){

    const result = await TasksModel.getAllTasksByUser(userId);

    return result;
}

async function getAllTasksByFamily(userId, familyId){

    const result = await TasksModel.getAllTasksByFamily(userId, familyId);

    return result;
}

async function updateTask(taskId, userId, activity, status, when){

    await TasksModel.updateTask(taskId, userId, activity, status, when);

}

async function deleteTask(taskId, userId){

    await TasksModel.deleteTask(taskId, userId);
    
}

export default {createTask, getTask, getAllTasksByUser, getAllTasksByFamily, updateTask, deleteTask};