import {useAtom} from "jotai";
import {PetAtom} from "./Atom.ts";
import {useEffect} from "react";

export default function InitializeData() {
    const [, setAllPets] = useAtom(PetAtom);

    useEffect(() => {
        fetch('https://api-divine-grass-2111.fly.dev/GetPets')
            .then(response => response.json())
            .then(data => setAllPets(data))
            .catch(error => console.error('Error fetching data:', error))
    }, [
        setAllPets
    ])
}