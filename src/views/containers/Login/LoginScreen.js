import React, { useState } from "react";
import { authOperations } from './state'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import '../../../includes/custom/css/login.css';
import { ROOT } from "../../../config/settings";

const LoginScreen = () => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const validateForm = () => {
    return 0 < email.length && 0 < password.length;
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(authOperations.loginUser(email, password))
      .then((result) => {
        console.log("result ", result)
        if (result === null) {
          console.log("asdasd")
          setErrorMessage("Incorrect username/password.");
        }
      });
    }

    // Change the redirect to the main page of your app
    if (isAuthenticated) {
      return <Redirect to={ROOT} />;
    }

    return (
      <div className="Login">
        <center><h2>Authentication Demo</h2></center>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <h5>{errorMessage}</h5>
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    );
}

export default LoginScreen;