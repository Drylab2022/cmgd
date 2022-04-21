import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../LoaderButton";
//import config from "../config";
import "./settings.css";

export default function Settings() {

  // useEffect(() => {
  //   setStripe(window.Stripe(config.STRIPE_KEY));
  // }, []);

  return (
    <div className="settings">
      <LinkContainer to="/settings/email">
        <LoaderButton block bsSize="large">
          Change Email
        </LoaderButton>
      </LinkContainer>
      <LinkContainer to="/settings/password">
        <LoaderButton block bsSize="large">
          Change Password
        </LoaderButton>
      </LinkContainer>
    </div>
  );
}