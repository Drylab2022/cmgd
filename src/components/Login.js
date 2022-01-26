import React, { useState } from "react";
import { useFormFields } from "../components/lib/hooksLib";
import "./Login.css";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import { useAppContext } from "../components/lib/contextLib";
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../components/lib/errorLib";

Amplify.configure(awsconfig);

export default function Login() {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: ""
  });
  
  function validateForm() {
    return fields.username.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      await Auth.signIn(fields.username, fields.password);
      userHasAuthenticated(true);
      history.push("/home");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }              

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="input"
            value={fields.username}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}