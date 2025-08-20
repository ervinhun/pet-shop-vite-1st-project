import {atom} from "jotai";
import type {pet} from "./model/Pet.ts"

export const PetAtom = atom<pet[]>([]);
PetAtom.debugLabel = "PetAtom";