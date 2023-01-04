import React from "react";
import { RouterProvider, Route } from "react-router";
import { createHashRouter, createRoutesFromElements } from "react-router-dom";
import Week from './week'
import Blind from "./blind";
import Day from './day'
import Viewer404 from "./404";

import './styles.scss';

const router = createHashRouter(
    createRoutesFromElements(<Route path="/" errorElement={<Viewer404/>}>
        <Route index element={<Week />} />
        <Route path="week" element={<Week />} />
        <Route path="day" element={<Day />} />
        <Route path="blind" element={<Blind />} />
    </Route>
    )
);

export default function ViewerApp(): JSX.Element {
    return <RouterProvider router={router} />
}