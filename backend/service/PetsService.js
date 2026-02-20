import { v4 as uuidv4 } from "uuid";
import PetsModel from "../models/petsmodel.js"
import AuthModel from "../models/authModel.js"

async function createPet(userId, familyId, name, img, age, weight, breed, sex, species, sterelized){
    
    await AuthModel.checkIfUserIsAbleToCreateAPet(userId, familyId);

    const id = uuidv4();
    const sterelizedValue = sterelized === true || sterelized === "true" ? 1 : 0;

    const newPet = { id, userId,familyId, name, img, age, weight, breed, sex, species, sterelized:sterelizedValue};

    await PetsModel.createPet(newPet);

    return newPet.id;
}

async function getAPet(userId, id){

    const pet = await PetsModel.getPetbyId(userId, id);

    return pet;
}

async function ListAllPeTs(userId){

    const pets = await PetsModel.ListAllPeTs(userId);

    return pets;
}

async function ListAllPetsFromAFamily( userId, familyId){

    const pets = await PetsModel.ListAllPetsFromAFamily(userId, familyId);

    return pets;
}

async function updatePet(petId, userId,  age, weight, breed, sex, species, sterelized){

    await PetsModel.updatePet(petId, userId,  age, weight, breed, sex, species, sterelized);

}

async function changePetName(petId, userId, name){

    await PetsModel.changePetName(petId, userId, name);

}

async function PutPetInAFamily(petId, userId, familyId){

    await PetsModel.PutPetInAFamily(petId, userId, familyId);

}

async function deletePet(userId, petId){

    const dependencies = await PetsModel.HasDependencies(petId);

    if (!dependencies){
        await PetsModel.deletePet(userId, petId)
    }

    await PetsModel.PenddingDeletePet(userId, petId)

}

export default {createPet, getAPet, ListAllPeTs, ListAllPetsFromAFamily, updatePet, changePetName, PutPetInAFamily, deletePet};