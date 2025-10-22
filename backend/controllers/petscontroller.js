import PetModel from"../models/petsmodel.js";

async function createPet(req, res) {

  const userId = req.params.userid;
  const { name, spicies, breed, age, weight, color} = req.body;

  if(!name) {
    return res.status(400).json({ message: "Nome do pet é obrigatório" });
  }
  if(!spicies) {
    return res.status(400).json({ message: "Espécie do pet é obrigatória" });
  }
  if(!breed) {
    return res.status(400).json({ message: "Raça do pet é obrigatória" });
  }
  if(!age) { 
    return res.status(400).json({ message: "Idade do pet é obrigatória" });
  }
  try {   
    const newPet = await PetModel.createPet(userId,  name, spicies, breed, age, weight, color);
    res.status(201).json(newPet);
  } catch (err) { 
    console.error(err);
    res.status(500).json({ message: "Erro ao salvar pet" });
  }
}
async function updatePet(req, res) {
    try {
        const userId = req.params.userid;
        const petId = req.params.id;
        const { name, spicies, breed, age, weight, color} = req.body;

        const updatedPet = await PetModel.updatePet(userId, petId, name, spicies, breed, age, weight, color);
        res.json(updatedPet);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao atualizar pet" });
    }
}

async function getPets(req, res) {
  try {
    const userId = req.params.userid;
    const pets = await PetModel.getPetsByUserId(userId);
    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao listar pets" });
  }
}

async function getPetById(req, res) {
  try {
    const userId = req.params.userid;
    const petId = req.params.id;
    const pet = await PetModel.getPetbyId(userId, petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado" });
    }   
    res.json(pet);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar pet" });
    }
}
async function deletePet(req, res) {
  try {
    const userId = req.params.userid;
    const petId = req.params.id;
    const deletedPet = await PetModel.deletePet(userId, petId);
    res.json(deletedPet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao remover pet" });
  }
}
export default { createPet, updatePet, getPets, getPetById, deletePet };