import {MyApi} from "../MyApi.ts";

export function getAllPets() {
    return MyApi.getPets.petGetPets();
}

export function getPetById(id: string) {
    return MyApi.getPetById.petGetPetById({id: id});
}

export function createPet(name: string, breed: string, imgurl?: string) {
    return MyApi.createPet.petCreatePet({name: name, breed: breed, imgurl: imgurl});
}

export function updatePet(id: string, name: string, breed: string, imgurl?: string, sold?: boolean) {
    return MyApi.updatePet.petUpdatePet({id: id, name: name, breed: breed, imgurl: imgurl, sold: sold});
}

export function deletePet(id: string) {
    return MyApi.deletePet.petDeletePet({id: id});
}