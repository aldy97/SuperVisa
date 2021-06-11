import * as React from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";

const register = async () => {
  const request = {
    username: "test",
    email: "test@gmail.com",
    password1: "1234567",
    password2: "1234567",
  };

  const URL = `${BASE_URL}/auth/registration/`;
  const response = await axios.post(URL, request);
  console.log(response);
};

function App() {
  React.useEffect(() => {
    register();
  }, []);
  return <div className="App"></div>;
}

export default App;
