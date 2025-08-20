import {useParams} from "react-router-dom";
import {useAtom} from "jotai";
import {PetAtom} from "../Atom.ts";

export default function PetDetail() {
    const {id} = useParams();
    const [allPets] = useAtom(PetAtom);
    const pet = allPets.find(p => p.id === id);
    console.log("id:" + id);


    function handleDelete(id: string) {
        console.log("Delete pet with id:", id);
    }

    function handleSell(id: string) {
        console.log("Sell pet with id:", id);
    }

    if (!pet) {
        return <div className="flex items-center justify-center h-screen">Pet not found</div>;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-800">
            <div className="relative flex flex-row bg-blue-400 text-black p-6 rounded-2xl w-3/4 max-w-2xl shadow-lg">


                    <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                        onClick={() => handleDelete(pet.id)}
                        className="text-red-600 hover:text-red-800 text-xl"
                        title="Delete"
                    >
                        ❌
                    </button>
                    {!pet.sold && (
                        <button
                            onClick={() => handleSell(pet.id)}
                            className="text-green-700 hover:text-green-900 text-xl"
                            title="Mark as Sold"
                        >
                            💸
                        </button>
                    )}
                </div>


                {/* Image on the left */}
                <figure className="flex-shrink-0">
                    <img
                        src={pet.imgurl}
                        alt={pet.name}
                        className="w-32 h-32 object-cover rounded-lg m-4"
                    />
                </figure>

                {/* Texts stacked vertically */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-4">{pet.name}</h1>
                    <p>Breed: {pet.breed}</p>
                    <p>Status: {pet.sold ? "Sold" : "Available"}</p>
                </div>
            </div>
        </div>

    );
}