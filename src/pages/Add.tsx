import { useState } from "react";
import {createPet} from "../dto/PetDto.ts";
import toast from "react-hot-toast";

export default function AddPetForm() {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [imgurl, setImgurl] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !breed || !imgurl) return alert("Please fill in all fields");
        createPet(name, breed, imgurl).then(response => {
            if (response.status === 200) {
                toast.success("Pet created successfully");
                console.log(response);
                window.location.reload();
            }
        })
            .catch(e => {
                console.log(e);
                if (e instanceof Response) {
                    e.json().then(problem => {
                        toast.err(problem.title);
                    })
                }
            });
        // Clear form
        setName("");
        setBreed("");
        setImgurl("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full"
            />
            <input
                type="text"
                placeholder="Breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="input input-bordered w-full"
            />
            <input
                type="text"
                placeholder="Image URL"
                value={imgurl}
                onChange={(e) => setImgurl(e.target.value)}
                className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary">
                Add Pet
            </button>
        </form>
    );
}
