import {
  UPLOAD_QUESTIONS,
  ANSWER_QUESTION,
  CLEAR_QUESTIONS_AND_ANSWERS,
  SWITCH_USER_STATUS,
} from "../actions/QuestionAction";

const initialState = {
  questions: [],
  answers: [],
  isLogin: false,
};

export const QuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_QUESTIONS: {
      return { ...state, questions: action.questions };
    }
    case ANSWER_QUESTION: {
      return { ...state, answers: action.answers };
    }
    case CLEAR_QUESTIONS_AND_ANSWERS: {
      return { ...state, questions: [], answers: [] };
    }
    case SWITCH_USER_STATUS: {
      return { ...state, isLogin: action.isLogin };
    }
    default:
      return state;
  }
};
