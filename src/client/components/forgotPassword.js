import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {validEmail} from "../../shared/index.js";
import "./CSS/forgotPassword.css";

const ErrorBase = styled.div`
  grid-column: 1 / 3;
  color: red;
  display: flex;
  justify-content: center;
  padding: 1em;
  min-height: 1.2em;
`;

const ErrorMessage = ({ msg = "", hide = false }) => {
    return (
        <ErrorBase style={{ display: hide ? "none" : "inherit" }}>{msg}</ErrorBase>
    );
};

export const ForgotPassword = () => {
    let [email, setEmail] = useState("");
    let [error, setError] = useState("");
    let navigate = useNavigate();

    const onChange = (ev) => {
        setEmail(ev.target.value);
    };

    const onClick = async (ev) => {
        ev.preventDefault();

        if(validEmail(email)){
            setError("Not a valid email format");
        }else {
            setError("");
            let res = await fetch(`http://localhost:8080/api/v1/user/verification?email=${email}`);
            if (res.ok) {
                navigate(`/setNewPassword/${email}`);
            } else {
                setError("Email address is not registered");
            }
        }
    }


    return (
        <div className="container padding-bottom-3x mb-2 forgotPwd">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <h2>Forgot your password?</h2>
                    <p>Change your password in three easy steps. This helps to keep your new password secure.</p>
                    <ol className="list-unstyled">
                        <li ><span className="text-primary text-medium">1. </span>Fill in your email address below.</li>
                        <li style={{marginTop: '0.2em'}}><span className="text-primary text-medium">2. </span>We'll email you a temporary code.</li>
                        <li style={{marginTop: '0.2em'}}><span className="text-primary text-medium">3. </span>Use the code to change your password on
                            our secure website.
                        </li>
                    </ol>
                    <form className="card mt-4">
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="email-for-pass">Enter your email address</label>
                                <input className="form-control" type="text" id="email-for-pass" required="" onChange={onChange}/><small
                                    className="form-text text-muted">Type in the email address you used when you
                                    registered. Then we'll email a code to this address. The code is valid within 5 minutes.</small>
                            </div>
                        </div>

                        <div className="card-footer">
                            <button className="btn btn-primary" onClick={onClick}>Set New Password</button>
                            {error !== "" && <span><ErrorMessage msg={error}/></span>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};