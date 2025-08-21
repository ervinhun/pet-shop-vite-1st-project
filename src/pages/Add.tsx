import {useState, useEffect} from "react";
import {createPet, updatePet} from "../dto/PetDto.ts";
import toast from "react-hot-toast";

interface AddPetModalProps {
    initialData?: any;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function AddPetModal({initialData, isOpen, setIsOpen}: AddPetModalProps) {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [imgurl, setImgurl] = useState("");

    console.log(JSON.stringify(initialData));
    useEffect(() => {
        if (initialData) {
            setName(initialData.name!);
            setBreed(initialData.breed!);
            setImgurl(initialData.imgurl!);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !breed || !imgurl) return alert("Please fill in all fields");
        if (initialData) {
            updatePet(initialData.id!, name, breed, imgurl).then(response => {
                toast.success("Pet updated successfully");
                console.log("✅ Success: ", response.status);
                window.location.reload();
            })
                .catch(e => {
                    console.log(e);
                    if (e instanceof Response) {
                        e.json().then(problem => {
                            toast.error(problem.title);
                        })
                    }
                });
        } else
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
                            toast.error(problem.title);
                        })
                    }
                });
        setName("");
        setBreed("");
        setImgurl("");
        setIsOpen(false);
    };

    return (
        <>


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
                                    {initialData!= null ? "Update" : "Add Pet"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
