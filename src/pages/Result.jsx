import React from "react";
import { CenteredBox } from "./Questions";
import { Result, Button } from "antd";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { CLEAR_QUESTIONS_AND_ANSWERS } from "../actions/QuestionAction";

// Page: shows the result of the submission
const ResultPage = (props) => {
  const { clearQuestionsAndAnswers, isSucc } = props;

  const history = useHistory();

  const onBackToListSelectionClick = () => {
    clearQuestionsAndAnswers();
    history.push("/question_lists");
  };

  return (
    <CenteredBox>
      <Result
        status={isSucc ? "success" : "warning"}
        title={
          isSucc
            ? "Successfully Submitted Your Answers To SuperVisas!"
            : "Something went wrong, please try agan later"
        }
        subTitle="You will hear back from SuperVisas very soon."
        extra={[
          <Button onClick={onBackToListSelectionClick}>
            Back to question lists
          </Button>,
        ]}
      />
    </CenteredBox>
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

export default connect(null, mapDispatchToProps)(ResultPage);
