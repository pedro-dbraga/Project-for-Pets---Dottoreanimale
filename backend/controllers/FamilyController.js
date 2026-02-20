import FamilyModel from '../models/familyModel.js';
import FamilyService from '../service/FamilyService.js';

async function createFamily(req, res) {

    try {
        const userId = req.user.id; 
        const { name} = req.body;

        const newFamily = await FamilyService.createFamily(userId, name);
        res.status(201).json(newFamily);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getFamilyByUserId(req, res) {
    const userId = req.user.id; 
    try {
        const families = await FamilyModel.getFamilyByUserId(userId);
        res.status(200).json(families);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateFamily(req, res) {
    const familyId = req.params.familyId;
    const userId = req.user.id; 
    const { name } = req.body;
    try {
        const updatedFamily = await FamilyService.updateFamilyName(familyId, userId, name);
        res.status(200).json(updatedFamily);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function removeFamily(req, res) {
    const familyId = req.params.familyId;
    const userId = req.user.id;
    try {   
        await FamilyService.deleteFamily(familyId, userId);

        res.status(204).json("Familia Excluida!");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export default { createFamily, removeFamily , getFamilyByUserId, updateFamily};