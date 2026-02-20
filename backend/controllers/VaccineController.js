import VaccineService from '../service/VaccineService.js';

async function createVacina(req, res) {
    const userId = req.user.id;
    const petId = req.params.petId;
    const { name, appliedAt, doseNumber, nextDoseAt } = req.body;

    try { 

        const newVacina = await VaccineService.createVaccineService(userId, petId, name, appliedAt, doseNumber, nextDoseAt);
        
        res.status(201).json(newVacina);
    } catch (error) {
        res.status(500).json({ error: `${error}`});
  }
}

async function getVaccineById(req, res) {
    const userId = req.user.id;
    const petId = req.params.petId;
    const id = req.params.id;

    try {
        const vaccine = await VaccineService.getVaccineById(id, petId, userId);
        res.status(200).json(vacina);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }   
}

async function getVacinasByPetId(req, res) {
    const userId = req.user.id;
    const petId = req.params.petId;

    try {
        const vaccines = await VaccineService.ListAllVaccinesFromAPet(petId, userId);
        
        const formatedVaccine = vaccines.map(vaccine => ({
            id: vaccine.id,
            name: vaccine.name,
            appliedAt: vaccine.appliedAt.toISOString().split("T")[0],
            doseNumber: vaccine.doseNumber
        }));

        res.status(200).json(formatedVaccine);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}


async function updateVacina(req, res) {
    const userId = req.user.id;
    const petId = req.params.petId;
    const id = req.params.id;
    const { name, appliedAt, doseNumber } = req.body;
    try {
        const updatedVacina = await VaccineService.updateVacina(id, petId, name, appliedAt, doseNumber, userId);
        res.status(200).json(updatedVacina);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

async function deleteVacina(req, res) {
    const userId = req.user.id;
    const petId = req.params.petId;
    const id = req.params.id;
    try {
        const deletedVacina = await VaccineService.deleteVacina(id, petId, userId);
        res.status(200).json(deletedVacina);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export default { createVacina, getVacinasByPetId, getVaccineById, updateVacina, deleteVacina };