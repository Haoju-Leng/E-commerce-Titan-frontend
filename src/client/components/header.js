import React from "react";
import './CSS/header.css'

const SignedInRight = ({user}) => {
    return(
        <ul className="nav navbar-nav navbar-right ml-auto rightSide">
            <li className="nav-item"><a className={"nav-link"} href="/profile" ><span
                className="glyphicon glyphicon-shopping-user"></span>Welcome {user}!
            </a></li>
            <li className="nav-item"><a className={"nav-link"} href="/orders" ><span
                className="glyphicon glyphicon-list-alt"></span>Orders
            </a></li>
            <li className="nav-item"><a className={"nav-link"} href="/cart"><span
                className="glyphicon glyphicon-shopping-cart"></span> Cart</a></li>
            <li className="nav-item"><a className={"nav-link"} href="/logout"><span
                className="glyphicon glyphicon-log-out"></span> Logout</a></li>
        </ul>
    );
}

const SignedOutRight = () =>{
    return(
        <ul className="nav navbar-nav navbar-right rightSide">
            <li><a className={"nav-link"} href="/login" ><span
                className="glyphicon glyphicon-shopping-cart"></span> My Cart</a></li>
            <li><a className={"nav-link"} href="/register" ><span
                className="glyphicon glyphicon-user"></span> SignUp</a></li>
            <li><a className={"nav-link"} href="/login"><span
                className="glyphicon glyphicon-log-in"></span>Login</a></li>
        </ul>
    );
}
export const Header = ({ user = "" }) => {
    return(
        <nav className="navbar navbar-light navbar-expand bg-light" style={{marginLeft: -15, marginRight: -15}}>
            <div className="container-fluid">
            {/*<div className="navbar">*/}
            {/*    /!*<img src="<c:url value="/resource/images/logo.png"/>" width="210px" height="130px" alt="logo-image"/>*!/*/}
            {/*    E-commerce Titans*/}
            {/*</div>*/}
                <a className="navbar-brand" href="/" style={{marginTop: 15}}>Some Names</a>
                <div className="collapse navbar-collapse" id="myNavbar">
                    {user !== "" ?
                    <SignedInRight user={user}/>
                    :<SignedOutRight />}
                </div>
            </div>
        </nav>
    );
}