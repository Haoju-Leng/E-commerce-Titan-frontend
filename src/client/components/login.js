import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import md5 from "md5";

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

export const Login = (props) => {
  let navigate = useNavigate();
  let [username, setUser] = useState("");
  let [password, setPass] = useState("");
  let [error, setError] = useState("");

  const onSubmit = async (ev) => {
    ev.preventDefault();
    let hashedPassword = md5(password);
    console.log(hashedPassword);
    let res = await fetch("http://localhost:8080/api/v1/user/login", {
      body: JSON.stringify({
        email: username,
        password: hashedPassword,
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      props.logIn(data);
      navigate(`/home`);
    } else {
      setError(`Error: ${data.error}`);
    }
  };

  useEffect(() => {
    document.getElementById("username").focus();
  }, []);

  return (
    <div
      className="container"
      style={{ marginTop: "30px", marginBottom: "180px" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="login-panel panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title" align="center">
                Sign In
              </h3>
            </div>
            <div className="panel-body">
              <form name="loginForm">
                <fieldset>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="E-mail"
                      name="username"
                      type="email"
                      id={"username"}
                      onChange={(ev) => setUser(ev.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      type="password"
                      onChange={(ev) => setPass(ev.target.value)}
                    />
                  </div>
                  {error !== "" && <ErrorMessage msg={error} />}
                  <div className="row justify-content-center" id="button">
                    <div className="col-5">
                      <button
                        className="btn btn-sm btn-success"
                        style={{ marginLeft: 40 + "px" }}
                        onClick={onSubmit}
                      >
                        Login
                      </button>
                      <div style={{ marginTop: "5px" }}>
                        <a href="/register" style={{ fontSize: "5px" }}>
                          Don't have an account?
                        </a>
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

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
};
