import { UPLOAD_QUESTIONS, ANSWER_QUESTION } from "../actions/QuestionAction";

const initialState = {
  questions: [],
  answers: [],
};

export const QuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_QUESTIONS: {
      return { ...state, questions: action.questions };
    }
    case ANSWER_QUESTION: {
      return { ...state, answers: action.answers };
    }
    default:
      return state;
  }
};
