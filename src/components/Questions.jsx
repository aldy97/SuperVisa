import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { ANSWER_QUESTION } from "../actions/QuestionAction";
import { useHistory } from "react-router";

// Page: render questions one by one
const Questions = (props) => {
  const { answerQuestion } = props;

  // regaurdless question type, response is always string
  const [response, setResponse] = useState("");

  const { questions, answers } = useSelector((state) => {
    return {
      questions: state.QuestionReducer.questions,
      answers: state.QuestionReducer.answers,
    };
  });

  //   const history = useHistory();

  const currentIndex = answers.length;

  // update answer to redux, and move on to the next question if there is any
  const onNextButtonClick = () => {
    const currentQuestion = questions[currentIndex];

    const answer = { question: `${currentQuestion.id}`, text: response };
    answers.push(answer);

    answerQuestion(answers);
  };

  //   useEffect(() => {
  //     console.log(currentIndex);
  //     console.log(answers);
  //   }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        Answer question: {currentIndex + 1} / {questions.length}
      </div>
      <QuestionCard question={questions[currentIndex]}></QuestionCard>
      {currentIndex + 1 === questions.length ? (
        <Button type="primary" size="large">
          Review
        </Button>
      ) : (
        <Button type="primary" size="large" onClick={onNextButtonClick}>
          Next
        </Button>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    answerQuestion(answers) {
      const action = { type: ANSWER_QUESTION, answers };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(Questions);
