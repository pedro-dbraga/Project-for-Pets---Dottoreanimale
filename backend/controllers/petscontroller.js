import PetService from"../service/PetsService.js";


async function createPet(req, res) {

  const userId = req.user.id;
  const familyId = req.params.familyId || null;
  const { name, img, age, weight, breed, sex, species, sterelized} = req.body;

  if(!name) {
    return res.status(400).json({ message: "Nome do pet é obrigatório" });
  }
  if(!species) {
    return res.status(400).json({ message: "Espécie do pet é obrigatória" });
  }
  if(!breed) {
    return res.status(400).json({ message: "Raça do pet é obrigatória" });
  }
  if(!age) { 
    return res.status(400).json({ message: "Idade do pet é obrigatória" });
  }
  try {   
    const newPet = await PetService.createPet(userId, familyId, name, img, age, weight, breed, sex, species, sterelized);
    res.status(201).json(newPet);
  } catch (err) { 
    console.error("controller", err);
    res.status(500).json({ error: err.mensage});
  }
}

async function getPetById(req, res) {

  try {

    const userId = req.user.id;
    const petId = req.params.id;

    const pet = await PetService.getPetbyId(userId, petId);
    res.json(pet);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar pet" });
    }
}

async function getPets(req, res) {
  try {
    const userId = req.user.id;
    const pets = await PetService.ListAllPeTs(userId);
    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao listar pets" });
  }
}

async function ListAllPetsFromAFamily(req, res) {

  try {
    const userId = req.user.id;
    const familyId = req.params.familyId;

    const [pets] = await PetService.ListAllPetsFromAFamily(userId, familyId);
    console.log(pets)
    res.status(200).json(pets);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao listar pets" });
  }
}

async function updatePet(req, res) {
    try {
        const userId = req.user.id;
        const petId = req.params.id;
        const { age, weight, breed, sex, species, sterelized} = req.body;

        const updatedPet = await PetService.updatePet(petId,userId, age, weight, breed, sex, species, sterelized );
        res.json(updatedPet);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao atualizar pet" });
    }
}

async function changePetName(req, res) {
  try {
        const userId = req.user.id;
        const petId = req.params.id;
        const { name} = req.body;

        const updatedPet = await PetService.changePetName(petId, userId, name );
        res.json(updatedPet);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao atualizar pet" });
    }
}

async function PutPetInAFamily (req, res) {
  const userId = req.user.id;
  const petId = req.params.id;
  const {familyId} = req.body;

  try {
    const result = await PetService.PutPetInAFamily(petId, userId, familyId);
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao adicionar pet à família" });
  }
}

async function deletePet(req, res) {
  try {
    const userId = req.user.id;
    const petId = req.params.id;
    const deletedPet = await PetService.deletePet(userId, petId);
    res.json({ mensage: "Pet Excluido!"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao remover pet" });
  }
}


export default { createPet, getPetById, getPets, ListAllPetsFromAFamily, updatePet, changePetName, PutPetInAFamily, deletePet };