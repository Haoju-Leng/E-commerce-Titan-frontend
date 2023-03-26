import React, {useState, useEffect, Fragment} from "react";
import PropTypes from "prop-types";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import {validEmail, validPassword} from "../../shared/index.js";
import "./CSS/forgotPassword.css";
import md5 from "md5";
import Popup from "reactjs-popup";

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
                    <PopupHeader className="header">{`Password has been reset!`}</PopupHeader>
                    <div className="actions">
                        <PopupButton
                            className="btn btn-primary"
                            onClick={() => {
                                props.navigate("/login");
                            }}
                        >
                            login
                        </PopupButton>
                    </div>
                </div>
            </Popup>
        </Fragment>
    );
};

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

export const SetNewPassword = () => {
    const { email } = useParams();

    let [state, setState] = useState({
        email: email,
        code: "",
        password: ""
    });

    let [error, setError] = useState("");
    let [success, setSuccess] = useState(false);
    let navigate = useNavigate();

    const onChange = (ev) => {
        setState({
            ...state,
            [ev.target.id]: ev.target.value,
        });
        // Make sure the username is valid
        if (ev.target.id === "password") {
            let pwdInvalid = validPassword(ev.target.value);
            if (pwdInvalid) {setError(`Error: ${pwdInvalid.error}`)}
            else{
                setError("");
            }
        }
        else if (ev.target.id === "confirmPass"){
            if (ev.target.value !== state.password){
                setError('Error: confirm password not matched with the password')
            }else{
                setError("");
            }
        }
    };

    const onClick = async (ev) => {
        ev.preventDefault();

        let hashedPassword = md5(state.password);

        let res = await fetch("http://localhost:8080/api/v1/user/password", {
            body: JSON.stringify({
                email: state.email,
                password: hashedPassword,
                code: state.code
            }),
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        });

        if (res.ok) {
            setSuccess(true);
        } else {
            setError(`Error happened`);
        }
    };
  return (
      <Fragment>
          {success && (
              <OkButton published={success} navigate={navigate}/>
          )}
      <div className="container padding-bottom-3x mb-2">
          <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10">
                  <h2>Set your new password</h2>
                  {/*<p>Change your password in three easy steps. This helps to keep your new password secure.</p>*/}
                  {/*<ol className="list-unstyled">*/}
                  {/*    <li ><span className="text-primary text-medium">1. </span>Fill in your email address below.</li>*/}
                  {/*    <li style={{marginTop: '0.2em'}}><span className="text-primary text-medium">2. </span>We'll email you a temporary code.</li>*/}
                  {/*    <li style={{marginTop: '0.2em'}}><span className="text-primary text-medium">3. </span>Use the code to change your password on*/}
                  {/*        our secure website.*/}
                  {/*    </li>*/}
                  {/*</ol>*/}
                  <form className="card mt-4">
                      <div className="card-body">
                          <div className="form-group">
                              <label htmlFor="code">Enter your verification code</label>
                              <input className="form-control" type="text" id="code" required="" onChange={onChange}/><small
                              className="form-text text-muted">Type in the code sent to your registered email. <a href="/forgotPassword">Didn't receive the code?</a></small>
                          </div>
                      </div>
                      <div className="card-body">
                          <div className="form-group">
                              <label htmlFor="password">Enter your new password</label>
                              <input className="form-control" type="password" id="password" required="" onChange={onChange}/>
                          </div>
                      </div>
                      <div className="card-body">
                          <div className="form-group">
                              <label htmlFor="confirmPass">Confirm your new password</label>
                              <input className="form-control" type="password" id="confirmPass" required="" onChange={onChange}/>
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
      </Fragment>
  );
};