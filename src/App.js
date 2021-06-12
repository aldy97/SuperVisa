import React from "react";
import LoginRegister from "./components/LoginRegister";
import QuestionListSelection from "./components/QuestionListSelection";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={LoginRegister}></Route>
        <Route
          path="/questions"
          exact
          component={QuestionListSelection}
        ></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
