import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import { CenteredBox } from "./Questions";
import Register from "../components/Register";
import FormToggler from "../components/FormToggler";
import { useHistory } from "react-router";

// disclaimer: I used my own code for Login and Registeration interface from my project budget-planner
const LoginRegister = () => {
  const [isAtLogin, setIsAtLogin] = useState(true);

  const toggle = () => {
    setIsAtLogin(!isAtLogin);
  };

  const history = useHistory();

  // when user has logged in before, directs to question_lists directly
  useEffect(() => {
    const key = localStorage.getItem("key");
    if (key) {
      history.push("/question_lists");
    }
  }, []);

  return (
    <CenteredBox>
      <FormToggler isAtLogin={isAtLogin} toggle={toggle}></FormToggler>
      {isAtLogin && <Login></Login>}
      {!isAtLogin && <Register></Register>}
    </CenteredBox>
  );
};

export default LoginRegister;
