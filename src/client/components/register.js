import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import md5 from "md5";
import {validEmail, validPassword} from "../../shared/index.js";
import { CometChat } from "@cometchat-pro/chat";
import {AUTH_KEY} from "../../shared/constant.js";

const ErrorBase = styled.div`
  grid-column: 1 / 3;
  color: red;
  display: flex;
  justify-content: center;
  padding: 1em;
  min-height: 1.2em;
  font-size: 4px;
`;

const Label = styled.label`
  font-size: 7px;
`;

const ErrorMessage = ({ msg = "", hide = false }) => {
    return (
        <ErrorBase style={{ display: hide ? "none" : "inherit"}}>{msg}</ErrorBase>
    );
};

export const Register = (props) => {
    let navigate = useNavigate();
    let [state, setState] = useState({
        username: "",
        firstName: "",
        lastName: "",
        city: "",
        phone: "",
        address: "",
        state: "",
        country: "",
        zipcode: "",
        email: "",
        password: "",
        confirmPass: "",
    });

    let [userError, setUserError] = useState("");
    let [addressError, setAddressError] = useState("");
    let [pwdError, setPwdError] = useState("");

    const onChange = (ev) => {
        // setPwdError("");
        // setUserError("");
        // setAddressError("");
        // Update from form and clear errors
        setState({
            ...state,
            [ev.target.id]: ev.target.value,
        });
        // Make sure the username is valid
        if (ev.target.id === "email") {
            let usernameInvalid = validEmail(ev.target.value);
            if (usernameInvalid) {setUserError(`Error: ${usernameInvalid.error}`)}
            else {setUserError("");}
        }
        // Make sure password is valid
        else if (ev.target.id === "password") {
            let pwdInvalid = validPassword(ev.target.value);
            if (pwdInvalid) {setPwdError(`Error: ${pwdInvalid.error}`)}
            else{
                setPwdError("");
            }
        }
        else if (ev.target.id === "confirmPass"){
            if (ev.target.value !== state.password){
                console.log(ev.target.value, state.password)
                setPwdError('Error: confirm password not matched with the password')
            }else{
                setPwdError("");
            }
        }
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();
        let hashedPassword = md5(state.password);

        let res = await fetch("http://localhost:8080/api/v1/user/register", {
            body: JSON.stringify({
                email: state.email,
                password: hashedPassword,
                firstName: state.firstName,
                lastName: state.lastName,
                address: state.address,
                city: state.city,
                state: state.state,
                country: state.country,
                zipcode: state.zipcode
            }),
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        });
        const data = await res.json();
        if (res.ok) {
            props.logIn(data);
            let authKey = AUTH_KEY;
            let uid = state.email.replace("@vanderbilt.edu", "").replaceAll(".", "_");
            let name = `${state.firstName} ${state.lastName} (${state.email})`;

            let user = new CometChat.User(uid);

            user.setName(name);

            CometChat.createUser(user, authKey).then(
                user => {
                    console.log("user created", user);
                    CometChat.login(uid, authKey).then(
                        data => {
                            console.log("User logged in", data);
                        },
                        error => {
                            console.log("Login failed with exception:", { error });
                        });
                },error => {
                    console.log("error", error);
                    CometChat.login(uid, authKey).then(
                        data => {
                            console.log("User logged in", data);
                        },
                        error => {
                            console.log("Login failed with exception:", { error });
                        });
                }
            )
            navigate(`/home`);
        } else {
            setPwdError(`Error: ${data.error}`);
        }
    };

    useEffect(() => {
        document.getElementById("firstName").focus();
    }, []);

    return (
        <div className="container" style={{marginTop: '30px', marginBottom: '180px'}}>
            <div className="row justify-content-center">
            <div className="col-8">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title" align="center">Sign Up</h3>
                    </div>
                    <div className="panel-body">
                        <form name="registerForm">
                            <fieldset>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div style={{marginBottom: '5px'}}>
                                            <center>User Details</center>
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <input type="text" className="form-control" placeholder="Enter First Name" onChange={onChange} id="firstName"></input>
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <input type="text" className="form-control" placeholder="Enter Last Name" onChange={onChange} id="lastName"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 form-group">
                                            <Label htmlFor="email">Email Id</Label>
                                            <input type="text" className="form-control" placeholder="Enter Email ID" onChange={onChange} id="email"></input>
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <input type="text" className="form-control" placeholder="Enter Phone Number" onChange={onChange} id="phone"></input>
                                        </div>
                                    </div>
                                    {userError !== "" && <ErrorMessage msg={userError}/>}
                                    <hr/>
                                        <div style={{marginBottom: '5px'}}>
                                            <center>Shipping Address</center>
                                        </div>
                                        <div className="form-group">
                                            <Label >Address</Label>
                                            <textarea type="text" className="form-control" placeholder="Enter Shipping Address" onChange={onChange} id="address"></textarea>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 form-group">
                                                <Label htmlFor="city">City</Label>
                                                <input type="text" placeholder="Enter Current City"
                                                            className="form-control"
                                                            id="city" onChange={onChange}></input>
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <Label htmlFor="state">State</Label>
                                                <input type="text" placeholder="Enter your State"
                                                            className="form-control"
                                                            id="state" onChange={onChange}></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6 form-group">
                                                <Label htmlFor="country">Country</Label>
                                                <input type="text" placeholder="Enter your country"
                                                            className="form-control"
                                                            id="country" onChange={onChange}></input>
                                            </div>
                                            <div className="col-sm-6 form-group">
                                                <Label htmlFor="zipcode">ZipCode</Label>
                                                <input type="text" placeholder="Enter zipcode"
                                                            className="form-control"
                                                            id="zipcode" onChange={onChange}></input>
                                            </div>
                                        </div>
                                    {addressError !== "" && <ErrorMessage msg={addressError}/>}
                                        <hr/>
                                            <div className="row">
                                                <div className="col-sm-6 form-group">
                                                    <Label htmlFor="password">Password</Label>
                                                    <input type="password" placeholder="******"
                                                                className="form-control"
                                                                id="password" onChange={onChange}></input>
                                                </div>
                                                <div className="col-sm-6 form-group">
                                                    <Label>Confirm Password</Label> <input type="password"
                                                                                           placeholder="******"
                                                                                           className="form-control"
                                                                                           id="confirmPass" onChange={onChange}/>
                                                </div>
                                            </div>
                                {pwdError !== "" && <ErrorMessage msg={pwdError}/>}
                                <div className="row justify-content-center" id="button" >
                                    <div className="col-3">
                                    <button className="btn btn-sm btn-success"
                                            style={{marginLeft: 40 + 'px'}} onClick={onSubmit}>Register
                                    </button>
                                    <div style={{marginTop: '5px'}}><a href="/login" style={{fontSize: '5px'}}>Already have an account?</a></div>
                                    </div>
                                </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

Register.propTypes = {
    logIn: PropTypes.func.isRequired
};