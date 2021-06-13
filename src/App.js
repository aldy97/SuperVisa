import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginRegister from "./pages/LoginRegister";
import QuestionListSelection from "./pages/QuestionListSelection";
import Questions from "./pages/Questions";
import Review from "./pages/Review";
import Result from "./pages/Result";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./reducers/index";

export const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <BrowserRouter>
        <Route path="/" exact component={LoginRegister}></Route>
        <Route
          path="/question_lists"
          exact
          component={QuestionListSelection}
        ></Route>
        <Route path="/questions" exact component={Questions}></Route>
        <Route path="/review" exact component={Review}></Route>
        <Route
          path="/result_succ"
          exact
          component={() => <Result isSucc />}
        ></Route>
        <Route
          path="/result_fail"
          exact
          component={() => <Result isSucc={false} />}
        ></Route>
      </BrowserRouter>
      <Footer></Footer>
    </Provider>
  );
}

export default App;
