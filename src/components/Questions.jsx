import React, { useEffect } from "react";
import QuestionCard from "./QuestionCard";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { ANSWER_QUESTION } from "../actions/QuestionAction";

// Page: render questions
const Questions = (props) => {
  const { answerQuestion } = props;
  const { questions } = useSelector((state) => {
    return { questions: state.QuestionReducer.questions };
  });

  useEffect(() => {}, []);

  return (
    <div>
      {questions.map((q, index) => {
        return (
          <QuestionCard key={`${index}+${q.id}`} question={q}></QuestionCard>
        );
      })}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    answerQuestion(answer) {
      const action = { type: ANSWER_QUESTION, answer };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(Questions);
