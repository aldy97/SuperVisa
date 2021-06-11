import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import FormToggler from "./FormToggler";

const LoginRegister = () => {
  const [isAtLogin, setIsAtLogin] = useState(true);

  const toggle = () => {
    setIsAtLogin(!isAtLogin);
  };

  return (
    <div>
      <FormToggler isAtLogin={isAtLogin} toggle={toggle}></FormToggler>
      {isAtLogin && <Login></Login>}
      {!isAtLogin && <Register></Register>}
    </div>
  );
};

export default LoginRegister;
