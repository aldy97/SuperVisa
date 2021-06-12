import React, { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { Button, message, Space } from "antd";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { ANSWER_QUESTION } from "../actions/QuestionAction";
import { useHistory } from "react-router";
import styled from "styled-components";

// place whatever being wrapped right in the center of the screen
export const CenteredBox = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

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
    if (!response) {
      message.info("Please answer this question first");
      return;
    }
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
    <CenteredBox>
      <Space direction="vertical" size={32}>
        {answers.length < questions.length && (
          <>
            <div style={{ fontSize: 24, color: "" }}>
              Answer question: {currentIndex + 1} / {questions.length}
            </div>
            <QuestionCard
              question={questions[currentIndex]}
              response={response}
              setResponse={setResponse}
            ></QuestionCard>
          </>
        )}
        {answers.length === questions.length ? (
          <>
            <div style={{ fontSize: 32 }}>
              You have answered all questions🎉
            </div>
            <Button type="primary" size="large" onClick={onReviewButtonClick}>
              Review My Answers
            </Button>
          </>
        ) : (
          <Button type="primary" size="large" onClick={onNextButtonClick}>
            Next
          </Button>
        )}
      </Space>
    </CenteredBox>
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
