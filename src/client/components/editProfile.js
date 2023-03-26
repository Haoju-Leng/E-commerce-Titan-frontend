import React, {useState, useEffect, Fragment} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./CSS/profile.css"
import Popup from "reactjs-popup";
import {ErrorMessage} from "./publish.js";

const PopupHeader = styled.div`
  width: 100%;
  text-align: center;
  padding: 0.3rem;
  margin-top: 1em;
`;

const PopupButton = styled.button`
  width: 15em;
  height: 3em;
  text-align: center;
  line-height: 0.8em;
  font-size: 0.4em;
  margin-top: 2em;
  margin-left: 23em;
  margin-bottom: 1em;
`;

const OkButton = (props) => {
    return (
        <Fragment>
            <Popup open={props.published} position="top center" modal>
                <div
                    style={{
                        borderStyle: "solid",
                        borderColor: "darkgray",
                        backgroundColor: "white",
                        width: "25em",
                        height: "5em",
                    }}
                >
                    <PopupHeader className="header">{`Profile updated!`}</PopupHeader>
                    <div className="actions">
                        <PopupButton
                            className="btn btn-primary"
                            onClick={() => {
                                props.navigate(0);
                            }}
                        >
                            Ok
                        </PopupButton>
                    </div>
                </div>
            </Popup>
        </Fragment>
    );
};

//TODO: onSubmit, image
export const EditProfile = ({ user }) => {
    const firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
    const lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);

    let navigate = useNavigate();
    let [success, setSuccess] = useState(false);
    let [error, setError] = useState(false);
    let [state, setState] = useState({
        firstName: "",
        lastName: "",
        city: "",
        phone: "",
        address: "",
        state: "",
        country: "",
        zipcode: "",
        email: ""
    });

    // useEffect(async () => {
    //     let res = await fetch("http://localhost:8080/api/v1/profile", { //TODO: update API
    //         method: "GET",
    //         headers: {
    //             "Authorization": `Bearer ${user.token}`
    //         },
    //     });
    //
    //     const data = await res.json();
    //     if (res.ok) {
    //         setState(data);
    //     }
    // });

    const onChange = (ev) => {
        setState({
            ...state,
            [ev.target.id]: ev.target.value,
        });
    };


    const onSubmit = async (ev) => {
        ev.preventDefault();
        let res = await fetch("http://localhost:8081/api/v1/profile/", {
            body: JSON.stringify(state),
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
        });
        if (res.ok) {
            setSuccess(true);
        } else {
            setError(true);
        }
    };


    return (
        <Fragment>
            {success && (
                <OkButton published={success} navigate={navigate}/>
            )}
        <div className="container-xl px-4 mt-4">
            <nav className="nav nav-borders">
                <a className="nav-link active ms-0"
                   href="https://www.bootdey.com/snippets/view/bs5-edit-profile-account-details"
                   target="__blank">Profile</a>
                <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-profile-billing-page"
                   target="__blank">Billing</a>
                <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-profile-security-page"
                   target="__blank">Security</a>
                <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-edit-notifications-page"
                   target="__blank">Notifications</a>
            </nav>
            <div className="mt-0 mb-4">
                <div className="row">
                    <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0">
                            <div className="card-header">Profile Picture</div>
                            <div className="card-body text-center">
                                <img className="img-account-profile rounded-circle mb-2"
                                     src="http://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                                    <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB
                                    </div>
                                    <button className="btn btn-primary" type="button">Upload new image</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4">
                            <div className="card-header">Account Details</div>
                            <div className="card-body">
                                <form>
                                    {/*<div className="mb-3">*/}
                                    {/*    <label className="small mb-1" htmlFor="inputUsername">Username (how your name*/}
                                    {/*        will appear to other users on the site)</label>*/}
                                    {/*    <input className="form-control" id="inputUsername" type="text"*/}
                                    {/*           placeholder="Enter your username" value="username"/>*/}
                                    {/*</div>*/}

                                    <div className="row gx-3 mb-3">

                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                            {/*<input className="form-control" id="inputFirstName" type="text"*/}
                                            {/*       placeholder="Enter your first name" value="Valerie"/>*/}
                                            <div style={{paddingTop: '0.4rem'}}>{firstName}</div>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                            {/*<input className="form-control" id="inputLastName" type="text"*/}
                                            {/*       placeholder="Enter your last name" value="Luna"/>*/}
                                            <div style={{paddingTop: '0.4rem'}}>{lastName}</div>
                                        </div>
                                    </div>
                                    <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                        <div style={{paddingTop: '0.4rem'}}>{user.email}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                        <input className="form-control" id="phone" type="tel"
                                               placeholder="Enter your phone number" defaultValue={state.phone} onChange={onChange}/>
                                    </div>
                                    </div>
                                    <hr/>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputOrgName">Shipping address</label>
                                        <input className="form-control" id="address" type="text"
                                               placeholder="Default Address" defaultValue={state.address} onChange={onChange}/>
                                    </div>
                                    <div className="row gx-3 mb-3">

                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputOrgName">City</label>
                                            <input className="form-control" id="city" type="text"
                                                   placeholder="Default City" defaultValue={state.city} onChange={onChange}/>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputLocation">State</label>
                                            <input className="form-control" id="state" type="text"
                                                   placeholder="Default state" defaultValue={state.state} onChange={onChange}/>
                                        </div>
                                    </div>
                                    <div className="row gx-3 mb-3">

                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputOrgName">Country</label>
                                            <input className="form-control" id="country" type="text"
                                                   placeholder="Default Country" defaultValue={state.country} onChange={onChange}/>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputLocation">ZipCode</label>
                                            <input className="form-control" id="zipcode" type="text"
                                                   placeholder="Default ZipCode" defaultValue={state.zipcode} onChange={onChange}/>
                                        </div>
                                    </div>

                                    <button className="btn btn-primary" type="button" onClick={onSubmit}>Save changes</button>
                                    {error && <span><ErrorMessage msg={"Error happened"}/></span>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </div>
        </Fragment>
    );
};