import React, { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { ANSWER_QUESTION } from "../actions/QuestionAction";
import { useHistory } from "react-router";

// Page: render questions one by one
const Questions = (props) => {
  const { answerQuestion } = props;

  const [response, setResponse] = useState("");

  const { questions, answers } = useSelector((state) => {
    return {
      questions: state.QuestionReducer.questions,
      answers: state.QuestionReducer.answers,
    };
  });

  const history = useHistory();
  const currentIndex = answers.length;

  // update answer to redux, and move on to the next question if there is any
  const onNextButtonClick = () => {
    const currentQuestion = questions[currentIndex];

    // redux store update
    const answer = { question: `${currentQuestion.id}`, text: response };
    answers.push(answer);
    answerQuestion(answers);

    setResponse("");
  };

  // redirects to review page
  const onReviewButtonClick = () => {
    history.push("/review");
  };

  return (
    <div style={{ textAlign: "center" }}>
      {answers.length < questions.length && (
        <>
          <div>
            Answer question: {currentIndex + 1} / {questions.length}
          </div>
          <QuestionCard
            question={questions[currentIndex]}
            setResponse={setResponse}
          ></QuestionCard>
        </>
      )}
      {answers.length === questions.length ? (
        <>
          <div>You have answered all questions</div>
          <Button type="primary" size="large" onClick={onReviewButtonClick}>
            Review
          </Button>
        </>
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
