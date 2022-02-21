import React, { useState } from "react";
import { authOperations } from './state'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Nav } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import '../../../includes/custom/css/login.css';
import { ROOT } from "../../../config/settings";

const LoginScreen = () => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [logged, setLogged] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const validateForm = () => {
        return 0 < email.length && 0 < password.length;
    }

    // const handlePasswordChange = (event) => {
    //     setPassword(event.target.value)
    // }

    // const handleEmailChange = (event) => {
    //     setEmail(event.target.value)
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(authOperations.loginUser(email, password))
            .then((result) => {
                if (result == null) {
                    setErrorMessage("Incorrect username/password.");
                }
            });
    }

    // Change the redirect to the main page of your app
    if (isAuthenticated) {
        return <Redirect to={ROOT} />;
    }

    return (
        <div className="loginBody">
            <div className="login-container">
                <div className="top">
                    <h1 className="title"><span id="logo">Records</span></h1>
                </div>
                <div className="login-box animated fadeInUp">
                    <div className="box-header">
                        <h2 className="loginTitle">Authenticate</h2>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <div className="p-4">
                            <Form.Group>
                                <Form.Control
                                    id="username"
                                    type="email"
                                    autoFocus
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    placeholder="Password"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <h6 style={{ color: "red" }} className="mt-2" >{errorMessage}</h6>
                            </Form.Group>
                            <Button className="login-btn" block size="lg" type="submit" disabled={!validateForm()}>Login
                            </Button>
                        </div>
                    </Form>
                    <Nav.Link href="#" className="forgotPw">Forgot your password?</Nav.Link>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;