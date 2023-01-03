import React from "react";
import { RouterProvider, Route } from "react-router";
import { createHashRouter, createRoutesFromElements } from "react-router-dom";
import Week from './week'
import Blind from "./blind";

const router = createHashRouter(
    createRoutesFromElements(<Route path="/">
        <Route index element={<Week />} />
        <Route path="week" element={<Week />} />
        <Route path="blind" element={<Blind />} />
    </Route>
    )
);

export default function ViewerApp(): JSX.Element {
    return <RouterProvider router={router} />
}