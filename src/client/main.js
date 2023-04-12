/* Copyright G. Hemingway, @2022 - All rights reserved */
"use strict";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, {useState} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Home} from "./components/home.js";

import {Header} from "./components/header.js";
// import { Landing } from "./components/landing.js";

import { Login } from "./components/login.js";
import { Logout } from "./components/logout.js";
import { Register } from "./components/register.js";
import { ItemDetail } from "./components/ItemDetail.js";

// import { Start } from "./components/start.js";
import {Cart} from "./components/cart.js";
import {Publish} from "./components/publish.js";
import {EditProfile} from "./components/editProfile.js";
import {Order} from "./components/order.js";
import {PostedItems} from "./components/postedItems";
import {ForgotPassword} from "./components/forgotPassword";
import {SetNewPassword} from "./components/setNewPassword";
import {ItemDetail} from "./components/ItemDetail.js";
// import { MoveDetail } from "./components/moveDetail.js";
import {CometChat} from '@cometchat-pro/chat'
import {APP_ID, REGION} from "../shared/constant.js";
import {Chat} from "./components/chat.js";
import {OrderPlaced} from "./components/orderPlaced";

const appID = APP_ID;
const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(REGION).build();
CometChat.init(appID, appSetting).then(
    () => {
        console.log("Initialization completed successfully");
    },
    error => {
        console.log("Initialization failed with error:", error);
    }
);



const defaultUser = {
  token: "",
  email: "",
  firstName: "",
  lastName: "",
    address: "",
    city: "",
    country: "",
    state: "",
    zipcode: "",
    phone: ""
};

/***
 *
 * @param user
 * @param children
 * @returns {JSX.Element|*}
 * @constructor
 */
const ReqUser = ({ user, children }) =>
  !user || user.firstName === "" ? (
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
    <Register logIn={logIn} />
  );

const CheckPublish = ({ loggedIn, state }) =>
  loggedIn === "" ? (
    <Navigate to={`/login`} replace={true} />
  ) : (
    <Publish user={state} />
  );

const CheckCart = ({ loggedIn, state }) =>
    loggedIn === "" ? (
        <Navigate to={`/login`} replace={true} />
    ) : (
        <Cart user={state}/>
    );

const CheckOrder = ({ loggedIn, state }) =>
    loggedIn === "" ? (
        <Navigate to={`/login`} replace={true} />
    ) : (
        <Order user={state}/>
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
                    <Route exact path="/" element={<Home user={state} />} />
                    <Route path="/home" element={<Home user={state} />} />
                    <Route path="/login" element={<Login logIn={logIn} />} />
                    <Route path="/logout" element={<Logout logOut={logOut} />} />
                    <Route
                        path="/register"
                        element={
                            <CheckRegister loggedIn={loggedIn()} logIn={logIn} />
                        }
                    />
                    <Route path="/post" element={<CheckPublish loggedIn={loggedIn()} state={state} />} />
                    <Route path="/item/:id" element={<ItemDetail user={state} />} />
                    <Route path="/cart" element={<CheckCart loggedIn={loggedIn()} state={state} />} />
                    {/*<Route path="/edit/:username" element={<EditProfile currentUser={state.username} />} />*/}
                    <Route
                        path="/profile"
                        element={<ReqUser user={state} children={<EditProfile user={state}/>}/>}
                    />
                    {/*<Route*/}
                    {/*    path="/start"*/}
                    {/*    element={*/}
                    {/*        <ReqUser user={state}>*/}
                    {/*            <Start />*/}
                    {/*        </ReqUser>*/}
                    {/*    }*/}
                    {/*/>*/}
                    <Route path="/orders" element={<CheckOrder loggedIn={loggedIn()} state={state} />} />
                    <Route path="/postedItems" element={<ReqUser user={state} children={<PostedItems user={state}/>}/>}/>
                    <Route path="/forgotPassword" element={<ForgotPassword />}/>}/>
                    <Route path="/setNewPassword/:email" element={<SetNewPassword />}/>}/>
                    <Route path="/chat" element={<ReqUser user={state} children={<Chat />} />}/>
                    <Route path="/chat/:email" element={<ReqUser user={state} children={<Chat />} />}/>
                    <Route path="/orderPlaced" element={<ReqUser user={state} children={<OrderPlaced />} />}/>


                </Routes>
            {/*</GridBase>*/}
        </BrowserRouter>
    );
};

const root = createRoot(document.getElementById("mainDiv"));
root.render(<MyApp />);
