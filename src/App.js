import React from "react";
import LoginRegister from "./components/LoginRegister";
import QuestionListSelection from "./components/QuestionListSelection";
import Questions from "./components/Questions";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={LoginRegister}></Route>
        <Route
          path="/question_lists"
          exact
          component={QuestionListSelection}
        ></Route>
        <Route path="/questions" exact component={Questions}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
