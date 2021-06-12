import React from "react";
import QuestionCard from "../components/QuestionCard";
import { Space, Button } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { CLEAR_QUESTIONS_AND_ANSWERS } from "../actions/QuestionAction";
import { authAxios } from "../utils/authAxios";
import { BASE_URL } from "../utils/constants";

// Page: renders all questions and all user's corresponding responses
const Review = (props) => {
  const { clearQuestionsAndAnswers } = props;
  const history = useHistory();

  const { questions, answers } = useSelector((state) => {
    return {
      questions: state.QuestionReducer.questions,
      answers: state.QuestionReducer.answers,
    };
  });

  // send api request to server for response submission
  const onSubmitClick = async () => {};

  return (
    <div style={{ textAlign: "center" }}>
      <div>These are your answers</div>
      <Space direction="vertical">
        {questions.map((question, index) => {
          return (
            <QuestionCard
              key={`${index} +${question.text}`}
              question={question}
              answer={answers[index]}
            ></QuestionCard>
          );
        })}
        <Space direction="horizontal">
          <Button
            size="large"
            type="primary"
            onClick={() => {
              clearQuestionsAndAnswers();
              history.push("/question_lists");
            }}
          >
            Back to question lists
          </Button>
          <Button size="large" type="primary" onClick={onSubmitClick}>
            Submit
          </Button>
        </Space>
      </Space>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearQuestionsAndAnswers() {
      const action = {
        type: CLEAR_QUESTIONS_AND_ANSWERS,
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(Review);
