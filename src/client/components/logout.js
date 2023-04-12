import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {CometChat} from "@cometchat-pro/chat";

export const Logout = ({ logOut }) => {
    let navigate = useNavigate();
    useEffect(() => {
        // Log out the actual user - i.e. clear user data
        logOut();
        CometChat.logout().then(
            () => {
                //Logout completed successfully
                console.log("Logout completed successfully");
            },
            (error) => {
                //Logout failed with exception
                console.log("Logout failed with exception:", { error });
            }
        );
        // Go to login page
        navigate("/login");
    });
    return <></>;
};

Logout.propTypes = {
    logOut: PropTypes.func.isRequired,
};