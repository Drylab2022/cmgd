import React, { useState } from "react";
import { useFormFields } from "../lib/hooksLib";
import "./changePassword.css";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../LoaderButton";
import { onError } from "../lib/errorLib";

export default function ChangePassword() {
  const history = useHistory();
  const [isChanging, setIsChanging] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    password: "",
    oldPassword: "",
    confirmPassword: "",
  });

  function validateForm() {
    return (
      fields.oldPassword.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleChangeClick(event) {
    event.preventDefault();
    setIsChanging(true);

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        currentUser,
        fields.oldPassword,
        fields.password
      );

      history.push("/settings");
    } catch (error) {
      onError(error);
      setIsChanging(false);
    }
  }

  return (
    <div className="ChangePassword">
      <form onSubmit={handleChangeClick}>
        <FormGroup bsSize="large" controlId="oldPassword">
          <FormLabel>Old Password</FormLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.oldPassword}
          />
        </FormGroup>
        
        <FormGroup bsSize="large" controlId="password">
          <FormLabel>New Password</FormLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.password}
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isChanging}
          disabled={!validateForm()}
        >
          Change Password
        </LoaderButton>
      </form>
    </div>
  );
}