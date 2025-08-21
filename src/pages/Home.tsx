import {useAtom} from "jotai";
import {PetAtom, ShowPetAtom, SortingAtom} from "../Atom.ts";
import {useNavigate} from "react-router-dom"
import Menu from "./Menu.tsx";
import {useMemo} from "react";


export default function Home() {

    const [pets, ] = useAtom(PetAtom);
    const [show, ] = useAtom(ShowPetAtom);
    const [sort, ] = useAtom(SortingAtom);
    const navigate = useNavigate();

    const filteredPets = useMemo(() => {
        let result = [...pets];

        // Filter
        if (show === "notSold") result = result.filter(p => !p.sold);
        else if (show === "sold") result = result.filter(p => p.sold);

        // Sort (always sort a copy)
        if (sort === "name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        else if (sort === "status")
            result = [...result].sort((a, b) => (a.sold === b.sold ? 0 : a.sold ? -1 : 1));
        else if (sort === "id") result = [...result].sort((a, b) => a.id.localeCompare(b.id));

        return result;
    }, [pets, show, sort]);


    return (
        <div className="flex flex-col min-h-screen bg-gray-100 items-center">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl bg-gray-100 px-6 py-12 rounded-lg shadow-md">
                {/* Logo + Title */}
                <div className="flex items-center space-x-4 mb-6 md:mb-0">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/620/620851.png"
                        alt="dog icon"
                        className="w-24 h-24 md:w-32 md:h-32"
                    />
                    <h1 className="text-4xl md:text-6xl font-bold text-black">
                        PetShop - Ervin
                    </h1>
                </div>

                {/* Menu / Buttons */}
                <div>
                    <Menu />
                </div>
            </div>


            {/* Content Section */}
            <div
                className="flex-1 flex flex-col items-center bg-blue-400 text-black p-6 rounded-2xl w-full shadow-lg mt-6">
                {filteredPets.map((pet) => (
                    <div
                        key={pet.id}
                        className={`card card-side bg-blue-500 shadow-md m-4 w-full cursor-pointer ${
                            pet.sold ? "opacity-50" : ""
                        }`}
                        onClick={() => navigate(`/pet/${pet.id}`)}
                    >
                        <figure>
                            <img
                                src={pet.imgurl}
                                alt={pet.name}
                                className="w-32 h-32 object-cover rounded-lg m-4"
                            />
                        </figure>
                        <div className="card-body justify-center">
                            <h2 className="card-title">{pet.name}</h2>
                            <p>Breed: {pet.breed}</p>
                            {pet.sold && <p className="font-bold">Sold</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}