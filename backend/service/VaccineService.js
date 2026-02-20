import VaccineModel from "../models/VaccineModel.js"
import authModel from "../models/authModel.js"

async function createVaccineService(userId, petId, name, appliedAt, doseNumber, nextDoseAt){

    
    const canCreate = await authModel.checkIfUserIsAbleToCreateVaccine(userId, petId);
    
    if (!canCreate) {
        throw new Error("Usuario não autorizado!")
    }

    const vaccine = await VaccineModel.createVaccine(petId, name, appliedAt, doseNumber, nextDoseAt);
    
    /*return vaccine.insertId;*/
}

async function getVaccineById(id, petId, userId){

    const result = await VaccineModel.getInfosFromVaccine(id, petId, userId);

    return result;
}

async function ListAllVaccinesFromAPet(petId, userId){

    const result = await VaccineModel.ListAllVaccinesFromAPet(petId, userId);

    return result;
}

async function updateVacina(id, petId, name, appliedAt, doseNumber, userId){

    await VaccineModel.updateVacina(id, petId, name, appliedAt, doseNumber, userId);

    const updatedVaccine = {name, appliedAt, doseNumber};

    return updatedVaccine;
}

async function deleteVaccine(id, petId, userId){

    
    /*const createdAt = await VaccineModel.whenVaccineWasCreated(id, petId, userId);

    if(createdAt >= (Date.now() - 24 * 60 * 60 * 1000)){
        await VaccineModel.hardDeleteVacina(id, petId, userId);
    }*/

    const hardDelete = await VaccineModel.hardDeleteVacina(id, petId, userId);

    if (hardDelete.affectedRows > 0) {
        return;
    }

    const softDelete = await VaccineModel.softDeleteVaccine(id, petId, userId)
    
    if (softDelete.affectedRows === 0 && hardDelete.affectedRows === 0) {
        throw new Error ("Não foi possivel deletar a vacina")
    }

}

export default {createVaccineService, getVaccineById, ListAllVaccinesFromAPet, updateVacina, deleteVaccine}