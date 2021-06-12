import React from "react";
import LoginRegister from "./components/LoginRegister";
import QuestionListSelection from "./components/QuestionListSelection";
import Questions from "./components/Questions";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./reducers/index";

export const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" exact component={LoginRegister}></Route>
        <Route
          path="/question_lists"
          exact
          component={QuestionListSelection}
        ></Route>
        <Route path="/questions" exact component={Questions}></Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
