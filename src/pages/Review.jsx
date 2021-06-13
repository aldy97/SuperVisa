import React, { useEffect } from "react";
import QuestionCard from "../components/QuestionCard";
import { Space, Button } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { CLEAR_QUESTIONS_AND_ANSWERS } from "../actions/QuestionAction";
import { authAxios } from "../utils/authAxios";

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

  const getRequestBody = () => {
    const body = [];
    for (let i = 0; i < questions.length; i++) {
      const answer = answers[i];
      const question = questions[i];
      body.push({ question: `${question.id}`, text: answer.text });
    }

    return { answers: body };
  };

  // send api request to server for response submission
  const onSubmitClick = async () => {
    const requestBody = getRequestBody();
    try {
      const key = localStorage.getItem("key");
      const axios = authAxios(key);
      await axios.post(`/api/responses/`, requestBody);

      history.push("/result_succ");
    } catch (err) {
      console.log(err);
      history.push("/result_fail");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 24 }}>Please review your answers👇</div>
      <Space direction="vertical" size={32}>
        {questions.map((question, index) => {
          return (
            <QuestionCard
              key={`${question.text}`}
              question={question}
              answer={answers[index]}
            ></QuestionCard>
          );
        })}
        <Space direction="horizontal">
          <Button
            size="large"
            type="default"
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
