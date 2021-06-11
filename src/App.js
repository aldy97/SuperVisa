import * as React from "react";
import axios from "axios";

const register = async () => {
  const request = {
    username: "div1",
    email: "div1@gmail.com",
    password1: "1234567!",
    password2: "1234567!",
  };

  try {
    const URL = "https://sv-survey.herokuapp.com/auth/registration/";
    const response = await axios.post(URL, request);
    console.log(response.data.key);
  } catch (e) {
    console.log(e);
  }
};

function App() {
  React.useEffect(() => {
    register();
  }, []);

  return <div className="App"></div>;
}

export default App;
