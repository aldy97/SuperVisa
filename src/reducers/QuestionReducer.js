import { UPLOAD_QUESTIONS, ANSWER_QUESTION } from "../actions/QuestionAction";

const initialState = {
  questions: [],
  answers: new Map(),
};

export const QuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_QUESTIONS: {
      return { ...state, questions: action.questions };
    }
    case ANSWER_QUESTION: {
      // `question` is actually the question id of the answer corresponding to
      const updatedAnswers = state.answers.set(
        action.answer.question,
        action.answer
      );
      return { ...state, answers: updatedAnswers };
    }
    default:
      return state;
  }
};
