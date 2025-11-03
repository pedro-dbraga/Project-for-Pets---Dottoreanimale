import Vacinamodel from '../models/VacinasModel.js';

async function createVacina(req, res) {
  const pet_id = req.params.petId;
  const { name, date } = req.body;

    try {   
    const newVacina = await Vacinamodel.createVacina(pet_id, name, date);
    res.status(201).json(newVacina);
  } catch (error) {
    res.status(404).json({ error: 'Failed to create vacina' });
  }
}

async function getVacinasByPetId(req, res) {
    const pet_id = req.params.petId;

    try {
        const vacinas = await Vacinamodel.getVacinasByPetId(pet_id);
        res.status(200).json(vacinas);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
async function getVacina(req, res) {
    const pet_id = req.params.petId;
    const id = req.params.id;
    try {
        const vacina = await Vacinamodel.getVacina(id, pet_id);
        res.status(200).json(vacina);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }   
}

async function updateVacina(req, res) {
    const pet_id = req.params.petId;
    const id = req.params.id;
    const { name, date } = req.body;
    try {
        const updatedVacina = await Vacinamodel.updateVacina(id, pet_id, name, date);
        res.status(200).json(updatedVacina);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
async function deleteVacina(req, res) {
    const pet_id = req.params.petId;
    const id = req.params.id;
    try {
        const deletedVacina = await Vacinamodel.deleteVacina(id, pet_id);
        res.status(200).json(deletedVacina);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export default { createVacina, getVacinasByPetId, getVacina, updateVacina, deleteVacina };