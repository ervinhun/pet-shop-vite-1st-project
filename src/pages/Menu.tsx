import {ShowPetAtom, SortingAtom} from "../Atom.ts";
import {useAtom} from "jotai";
import {useRef} from "react";
import AddPetForm from "./Add.tsx";

export default function Menu() {

    const [show, setShow] = useAtom(ShowPetAtom);
    const [sort, setSort] = useAtom(SortingAtom);
    const detailsRef = useRef<HTMLDetailsElement>(null);
    const detailsRefSort = useRef<HTMLDetailsElement>(null);

    function closeMenu() {
        if (detailsRef.current) {
            detailsRef.current.open = false;
        }
        if (detailsRefSort.current) {
            detailsRefSort.current.open = false;
        }
    }

    function sorting(value: string) {
        setSort(value);
        closeMenu();
    }

    function filtering(value: string) {
        setShow(value);
        closeMenu();
    }


    return (
        <div className="navbar shadow-sm">
            <div className="flex-none bg-none align-middle text-black">

                <AddPetForm/>
                <ul className="menu menu-horizontal px-1 space-x-2 ml-auto">
                    <li>
                        <details ref={detailsRef}>
                            <summary>Show</summary>
                            <ul className="rounded-t-none p-2 bg-white space-y-2">
                                <li onClick={() => {
                                    filtering("all");
                                }}
                                    className={`cursor-pointer ${show === "all" ? "font-bold" : "font-normal"}`}>
                                    All
                                </li>
                                <li onClick={() => {
                                    filtering("notSold");
                                }}
                                    className={`cursor-pointer ${show === "notSold" ? "font-bold" : "font-normal"}`}>
                                    Available
                                </li>
                                <li onClick={() => {
                                    filtering("sold");
                                }}
                                    className={`cursor-pointer ${show === "sold" ? "font-bold" : "font-normal"}`}>
                                    Sold
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details ref={detailsRefSort}>
                            <summary>Sort</summary>
                            <ul className="rounded-t-none p-2 bg-white space-y-2">
                                <li onClick={() => {
                                    sorting("id");
                                }}
                                    className={`cursor-pointer ${sort === "id" ? "font-bold" : "font-normal"}`}>
                                    Id
                                </li>
                                <li onClick={() => {
                                    sorting("name");
                                }}
                                    className={`cursor-pointer ${sort === "name" ? "font-bold" : "font-normal"}`}>
                                    Name
                                </li>
                                <li onClick={() => {
                                    sorting("status");
                                }}
                                    className={`cursor-pointer ${sort === "status" ? "font-bold" : "font-normal"}`}>
                                    Status
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}