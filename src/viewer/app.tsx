import { Route, RouterProvider } from "react-router";
import { createHashRouter, createRoutesFromElements } from "react-router-dom";

import Viewer404 from "./404";
import ViewerGroups from "./groups/";
import ViewerTeachers from "./teachers/";

import './styles.scss';

const router = createHashRouter(
    createRoutesFromElements(<Route path="/" errorElement={<Viewer404/>}>
        <Route index element={<ViewerGroups.Day />} />
        <Route path="groups">
            <Route index element={<ViewerGroups.Week />} />
            <Route path="week" element={<ViewerGroups.Week />} />
            <Route path="day" element={<ViewerGroups.Day />} />
            <Route path="blind" element={<ViewerGroups.Blind />} />
        </Route>
        <Route path="teachers">
            <Route index element={<ViewerTeachers.Week />} />
            <Route path="week" element={<ViewerTeachers.Week />} />
        </Route>
    </Route>
    )
);

export default function ViewerApp(): JSX.Element {
    return <RouterProvider router={router} />
}