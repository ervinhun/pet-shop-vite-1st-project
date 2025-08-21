import {atom} from "jotai";
import type {pet} from "./model/Pet.ts"

export const PetAtom = atom<pet[]>([]);
PetAtom.debugLabel = "PetAtom";

export const ShowPetAtom = atom("all");
ShowPetAtom.debugLabel = "ShowPetAtom";

export const SortingAtom = atom("name");
SortingAtom.debugLabel = "SortingAtom";