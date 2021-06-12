import {
  UPLOAD_QUESTIONS,
  ANSWER_QUESTION,
  CLEAR_QUESTIONS_AND_ANSWERS,
} from "../actions/QuestionAction";

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
    case CLEAR_QUESTIONS_AND_ANSWERS: {
      return { questions: [], answers: [] };
    }
    default:
      return state;
  }
};
