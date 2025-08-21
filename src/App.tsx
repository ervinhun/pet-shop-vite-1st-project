import Home from './pages/Home'
import './index.css'
import InitializeData from "./InitializeData.tsx";
import {createBrowserRouter, RouterProvider, type RouteObject} from "react-router-dom";
import PetDetail from "./pages/PetDetail.tsx";
import NewPet from "./pages/NewPet.tsx";

const myRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/pet/:id",
        element: <PetDetail/>
    },
    {
        path: "new",
        element: <NewPet/>
    }
]

function App() {
    InitializeData();
    return <RouterProvider router={createBrowserRouter(myRoutes)}/>
}

export default App
