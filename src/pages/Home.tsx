import {useAtom} from "jotai";
import {PetAtom} from "../Atom.ts";
import {useNavigate} from "react-router-dom"

export default function Home() {

    const [pets] = useAtom(PetAtom);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 items-center">
            {/* Hero Section */}
            <div className="flex flex-wrap items-center justify-center bg-gray-100 text-black text-6xl py-12">
                <img src="/src/img/dog.png" alt="dog icon" width="100px" height="100px"/>
                PetShop - Ervin
            </div>

            {/* Content Section */}
            <div
                className="flex-1 flex flex-col items-center bg-blue-400 text-black p-6 rounded-2xl w-5/6 shadow-lg mt-6">
                {pets.map((pet) => (
                        <div
                            key={pet.id}
                            className={`card card-side bg-blue-500 shadow-md m-4 w-3/5 cursor-pointer ${
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