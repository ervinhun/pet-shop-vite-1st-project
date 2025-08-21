import { useState } from "react";
import {createPet} from "../dto/PetDto.ts";
import toast from "react-hot-toast";

export default function AddPetModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [imgurl, setImgurl] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !breed || !imgurl) return alert("Please fill in all fields");
        createPet(name, breed, imgurl).then(response => {
            if (response.status === 200) {
                toast.success("Pet created successfully");
                console.log("✅ Success: ", response.status);
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
        setName("");
        setBreed("");
        setImgurl("");
        setIsOpen(false); // close modal after submit
    };

    return (
        <>
            {/* Trigger Button */}
            <button className="btn btn-ghost normal-case text-xl" onClick={() => setIsOpen(true)}>
                Add Pet
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Add a New Pet</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                maxLength={50}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered w-full bg-gray-200 text-black"
                            />
                            <input
                                type="text"
                                placeholder="Breed"
                                value={breed}
                                maxLength={50}
                                onChange={(e) => setBreed(e.target.value)}
                                className="input input-bordered w-full bg-gray-200 text-black"
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={imgurl}
                                maxLength={255}
                                onChange={(e) => setImgurl(e.target.value)}
                                className="input input-bordered w-full bg-gray-200 text-black"
                            />
                            <div className="flex justify-end space-x-2">
                                <button type="button" className="btn btn-outline" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Add Pet
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
