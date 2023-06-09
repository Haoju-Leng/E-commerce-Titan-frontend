import React, {useEffect, useState} from "react";
import './CSS/header.css';
import './CSS/header2.css';
import {CometChat} from "@cometchat-pro/chat";

const SignedInRight = ({user}) => {
    return(
        // <ul className="nav navbar-nav navbar-right ml-auto rightSide">
        //     <li className="nav-item"><a className={"nav-link"} href="/profile" ><span
        //         className="glyphicon glyphicon-shopping-user"></span>Welcome {user}!
        //     </a></li>
        //     <li className="nav-item"><a className={"nav-link"} href="/orders" ><span
        //         className="glyphicon glyphicon-list-alt"></span>Orders
        //     </a></li>
        //     <li className="nav-item"><a className={"nav-link"} href="/cart"><span
        //         className="glyphicon glyphicon-shopping-cart"></span> Cart</a></li>
        //         <li className="nav-item"><a className={"nav-link"} href="/post"><span
        //         className="glyphicon glyphicon-shopping-cart"></span> Post</a></li>
        //     <li className="nav-item"><a className={"nav-link"} href="/logout"><span
        //         className="glyphicon glyphicon-log-out"></span> Logout</a></li>
        // </ul>
        // <div className="nav navbar-nav navbar-right rightSide right-cta-menu text-right d-flex float-right">
        //     <div style={{marginBottom: '1em'}} className="ml-auto">
        //         <a style={{marginRight: '1em'}} href="/post"
        //            className="btn btn-outline-white nav-link border-width-2 d-none d-lg-inline-block"><span
        //             className="mr-2 glyphicon glyphicon-plus"></span>Post</a>
        //         <a style={{marginRight: '3em'}} href="/logout" className="btn btn-primary nav-link border-width-2 d-none d-lg-inline-block"><span
        //             className="mr-2 glyphicon glyphicon-lock"></span>Log Out</a>
        //     </div>
        // </div>
        <div className="nav navbar-nav navbar-right rightSide right-cta-menu text-right d-flex float-right">
            <div style={{marginBottom: '1em'}} className="ml-auto">
                <a style={{marginRight: '1em'}} href="/post"
                   className="btn btn-outline-white nav-link border-width-2 d-none d-lg-inline-block"><span
                    className="mr-2 glyphicon glyphicon-plus"></span>Post</a>
                <a style={{marginRight: '3em'}} href="/logout" className="btn btn-primary nav-link border-width-2 d-none d-lg-inline-block"><span
                    className="mr-2 glyphicon glyphicon-lock"></span>Log Out</a>
            </div>
        </div>
    );
}

const SignedOutRight = () =>{
    return(
        // <ul className="nav navbar-nav navbar-right rightSide">
        //     <li><a className={"nav-link"} href="/login" ><span
        //         className="glyphicon glyphicon-shopping-cart"></span> My Cart</a></li>
        //     <li><a className={"nav-link"} href="/register" ><span
        //         className="glyphicon glyphicon-user"></span> SignUp</a></li>
        //     <li><a className={"nav-link"} href="/login"><span
        //         className="glyphicon glyphicon-log-in"></span>Login</a></li>
        // </ul>
        <div>
            <div style={{marginBottom: '1em'}} className="ml-auto float-right">
                <ul className="navbar-nav float-right">
                    <li><a href="/register"
                   className="nav-item nav-link float-right"><span
                        className="mr-2 glyphicon glyphicon-plus"></span>Sign Up</a></li>
                    <li> <a  href="/login" className="nav-item nav-link float-right"><span
                        className="mr-2 glyphicon glyphicon-lock "></span>Log In</a></li>
                </ul>
            </div>
        </div>
    );
}
export const Header = ({ user = "" }) => {
    // return(
    //     <nav className="navbar navbar-light navbar-expand bg-light" style={{marginLeft: -15, marginRight: -15}}>
    //         <div className="container-fluid">
    //         {/*<div className="navbar">*/}
    //         {/*    /!*<img src="<c:url value="/resource/images/logo.png"/>" width="210px" height="130px" alt="logo-image"/>*!/*/}
    //         {/*    E-commerce Titans*/}
    //         {/*</div>*/}
    //             <a className="navbar-brand" href="/home" style={{marginTop: 15}}>Some Names</a>
    //             <div className="collapse navbar-collapse" id="myNavbar">
    //                 {user !== "" ?
    //                 <SignedInRight user={user}/>
    //                 :<SignedOutRight />}
    //             </div>
    //         </div>
    //     </nav>
    // );
    let [message, setMessage] = useState(0);

    useEffect(() => {
        CometChat.getUnreadMessageCountForAllUsers().then(
            array => {
                console.log("Message count fetched", array);
                setMessage(Object.keys(array).length);
            },
            error => {
                console.log("Error in getting message count", error);
            }
        );
    })

    return(
        <header className="header-area overlay headerDiv" style={{marginLeft: -15, marginRight: -15}}>
            <nav className="navbar navbar-expand navbar-dark" >
                <div className="container">
                    <a style={{marginTop: '1em'}} href="/home" className="navbar-brand">Brand</a>

                    <button type="button" className="navbar-toggler collapsed" data-toggle="collapse"
                            data-target="#main-nav">
                        <span className="menu-icon-bar"></span>
                        <span className="menu-icon-bar"></span>
                        <span className="menu-icon-bar"></span>
                    </button>

                    <div id="main-nav" className="collapse navbar-collapse">
                        {user !== "" &&
                            <ul className="navbar-nav ml-auto">
                                <li><a href="/home" className="nav-item nav-link active">Home</a></li>
                                <li><a href="/cart" className="nav-item nav-link">Cart</a></li>
                                <li className="dropdown">
                                    <a href="#" className="nav-item nav-link" data-toggle="dropdown">My account</a>
                                    <div className="dropdown-menu">
                                        <a href="/post" className="dropdown-item">Post an item</a>
                                        <a href="/profile" className="dropdown-item">Profile</a>
                                        <a href="/orders" className="dropdown-item">Orders</a>
                                        <a href="/postedItems" className="dropdown-item">Posted items</a>
                                        <a href="/logout" className="dropdown-item">Logout</a>
                                    </div>
                                </li>
                                <li><a href="/chat" className="nav-item nav-link"><i className="bi bi-chat-left-text">
                                    {message !== 0 &&
                                        <span className="position-absolute top-20 start-90 translate-middle p-1 bg-danger border border-light rounded-circle"></span>}
                                    </i>
                                    </a>
                                </li>
                            </ul>
                        }
                    </div>
                    {user === "" &&
                        <SignedOutRight />}
                </div>
                {/*{user !== "" ?*/}
                {/*<SignedInRight user={user}/>*/}
                {/*:<SignedOutRight />}*/}

            </nav>

        </header>
    );
}

