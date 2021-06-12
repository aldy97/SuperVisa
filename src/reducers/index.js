import { applyMiddleware, combineReducers, createStore } from "redux";
import { QuestionReducer } from "./QuestionReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  QuestionReducer,
});

export const configureStore = () => {
  const middlewares = [];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );
  return store;
};
