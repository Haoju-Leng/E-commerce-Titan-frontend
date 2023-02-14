/* Copyright G. Hemingway, @2022 - All rights reserved */
"use strict";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Header } from "./components/header.js";
// import { Landing } from "./components/landing.js";
import { Login } from "./components/login.js";
import { Logout } from "./components/logout.js";
import { Register } from "./components/register.js";
// import { Profile } from "./components/profile.js";
// import { Start } from "./components/start.js";
// import { Results } from "./components/results.js";
import { Publish } from "./components/publish.js";
// import { EditProfile } from "./components/editProfile.js";
// import { MoveDetail } from "./components/moveDetail.js";

const defaultUser = {
    token: "",
    email: "",
    firstName: "",
    lastName: ""
};

/***
 *
 * @param user
 * @param children
 * @returns {JSX.Element|*}
 * @constructor
 */
const ReqUser = ({ user, children }) =>
    !user || user.username === "" ? (
        <Navigate to={"/login"} replace={true} />
    ) : (
        children
    );

/***
 *
 * @param loggedIn
 * @param username
 * @returns {JSX.Element}
 * @constructor
 */
const CheckRegister = ({ loggedIn, logIn }) =>
    loggedIn !== "" ? (
        <Navigate to={`/`} replace={true} />
    ) : (
        <Register logIn={logIn}/>
    );

const CheckPublish = ({ loggedIn, state }) =>
    loggedIn === "" ? (
        <Navigate to={`/login`} replace={true} />
    ) : (
        <Publish user={state}/>
    );

/***
 * Main application entry point
 * @returns {JSX.Element}
 * @constructor
 */
const MyApp = () => {
    // If the user has logged in, grab info from sessionStorage
    const data = localStorage.getItem("user");
    let [state, setState] = useState(data ? JSON.parse(data) : defaultUser);
    console.log(`Starting as user: ${state.firstName}`);

    // Helper to check if the user is logged in or not
    const loggedIn = () => {
        return state.firstName;
    };

    // Helper to manage what happens when the user logs in
    const logIn = async (data) => {
        // const response = await fetch(`/v1/user/${username}`); //TODO: make consistent with API doc
        // const user = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        setState(data);
    };

    // Helper for when a user logs out
    const logOut = () => {
        // Wipe localStorage
        localStorage.removeItem("user");
        // Reset user state
        setState(defaultUser);
    };

    return (
        <BrowserRouter>
            {/*<GridBase>*/}
                <Header user={state.firstName}/>
                <Routes>
                    {/*<Route exact path="/" element={<Landing />} />*/}
                    <Route path="/login" element={<Login logIn={logIn} />} />
                    <Route path="/logout" element={<Logout logOut={logOut} />} />
                    <Route
                        path="/register"
                        element={
                            <CheckRegister loggedIn={loggedIn()} logIn={logIn} />
                        }
                    />
                    <Route path="/post" element={<CheckPublish loggedIn={loggedIn()} state={state} />} />
                    {/*<Route path="/item/:id" element={<ItemDetail user={state} />} />*/}
                    {/*<Route*/}
                    {/*    path="/profile/:username"*/}
                    {/*    element={<Profile currentUser={state.username} />}*/}
                    {/*/>*/}
                    {/*<Route*/}
                    {/*    path="/start"*/}
                    {/*    element={*/}
                    {/*        <ReqUser user={state}>*/}
                    {/*            <Start />*/}
                    {/*        </ReqUser>*/}
                    {/*    }*/}
                    {/*/>*/}


                    {/*<Route path="/results/:id" element={<Results user={state} />} />*/}
                    {/*<Route path="/edit/:username" element={<EditProfile currentUser={state.username} />} />*/}
                </Routes>
            {/*</GridBase>*/}
        </BrowserRouter>
    );
};

const root = createRoot(document.getElementById("mainDiv"));
root.render(<MyApp />);
