import Home from './pages/Home'
import './index.css'
import InitializeData from "./InitializeData.tsx";
import {createBrowserRouter, RouterProvider, type RouteObject} from "react-router-dom";
import PetDetail from "./pages/PetDetail.tsx";

const myRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/pet/:id",
        element: <PetDetail/>
    }
]

function App() {
    InitializeData();
    return <RouterProvider router={createBrowserRouter(myRoutes)}/>
}

export default App
