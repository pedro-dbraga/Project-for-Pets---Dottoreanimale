import PetModel from"../models/petsmodel.js";

async function createPet(req, res) {

  const userId = req.params.userid;
  const { name, img, age, weight, breed, sex, spieci, sterelized} = req.body;

  if(!name) {
    return res.status(400).json({ message: "Nome do pet é obrigatório" });
  }
  if(!spieci) {
    return res.status(400).json({ message: "Espécie do pet é obrigatória" });
  }
  if(!breed) {
    return res.status(400).json({ message: "Raça do pet é obrigatória" });
  }
  if(!age) { 
    return res.status(400).json({ message: "Idade do pet é obrigatória" });
  }
  try {   
    const newPet = await PetModel.createPet(userId,  name, img, age, weight, breed, sex, spieci, sterelized);
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
        const { age, weight, breed, sex, spieci, sterelized} = req.body;

        const updatedPet = await PetModel.updatePet(petId,userId, age, weight, breed, sex, spieci, sterelized );
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
      return res.status(404).json({ message: "Pet não encontrado back" });
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

async function changePetName(req, res) {
  try {
        const userId = req.params.userid;
        const petId = req.params.id;
        const { name} = req.body;

        const updatedPet = await PetModel.changePetName(petId, userId, name );
        res.json(updatedPet);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao atualizar pet" });
    }
  }
export default { createPet, updatePet, getPets, getPetById, deletePet, changePetName };