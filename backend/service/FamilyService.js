import FamilyModel from "../models/familyModel.js";
import MemberModel from "../models/memberModel.js";
import PetsModel from "../models/petsmodel.js";
import { v4 as uuidv4 } from "uuid";

import pool from "../db.js";

async function createFamily(userId, name){
    const connection = await pool.getConnection();

    try{

        const familyId = uuidv4();

        await connection.beginTransaction();
        
        await FamilyModel.createFamily(familyId, name, connection);
        
        const role = "admin";

    
        await MemberModel.createMember(familyId,userId, role, connection );

        const newFamily = {familyId, name};
        await connection.commit();
        return newFamily;
    }   catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }

}

async function getFamilyByUserId(userId){

     const family = await FamilyModel.getFamilyByUserId(userId);
    
        if (!family) {
            throw new Error("Usuário não encontrado");
        }
        return family;
}

async function updateFamilyName(familyId, userId, name){
    const result = await FamilyModel.updateFamily(familyId, userId, name);

    if(result.affectedRows === 0){
        throw new Error("Não foi possivel atualizar a Familia!");
    }

    return name;
}

async function deleteFamily(familyId, userId){
       const connection = await pool.getConnection();

    try{

        await connection.beginTransaction();
        
        await FamilyModel.removeFamily(familyId, userId, connection);
        /*so cahamar essa função se possuir pets na familia, se nao hard delete*/ 
        await PetsModel.PenddingDeletePet(userId, connection);

        await MemberModel.FamilyEnded(familyId, connection);

        await connection.commit();
        
    }   catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
}


export default {createFamily, getFamilyByUserId, updateFamilyName, deleteFamily};

