import React, { useEffect, useState } from "react";
import { CenteredBox } from "./Questions";
import { authAxios } from "../utils/authAxios";
import { Button, Space, message } from "antd";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import {
  UPLOAD_QUESTIONS,
  CLEAR_QUESTIONS_AND_ANSWERS,
  SWITCH_USER_STATUS,
} from "../actions/QuestionAction";

const styles = {
  wrapper: { textAlign: "center" },
  listButton: {
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 32,
  },
};

// Page: selecting from question lists
const QuestionListSelection = (props) => {
  const { updateQuestionsToRedux, clearQuestionsAndAnswers, setIsLogin } =
    props;
  // obtained from api request, list of string:
  const [lists, setLists] = useState([]);
  // index of the selected list:
  const [selectedListID, setSelectedListID] = useState(null);

  const history = useHistory();

  const key = localStorage.getItem("key");
  const axios = authAxios(key);

  const getQuestionLists = async () => {
    const response = await axios.get(`/api/question_lists/`);
    const tempLists = [];

    for (const list of response.data) {
      tempLists.push(list.name);
    }
    setLists(tempLists);
  };

  // get questions based on question list id, upload that to redux;
  const getQuestions = async () => {
    const response = await axios.get(`/api/questions/?list=${selectedListID}`);

    const questions = response.data;
    updateQuestionsToRedux(questions);
  };

  // if a question list is selected, directs it to questions page
  const handleConfirmSelectionClick = async () => {
    // executes if no list is selected by user
    if (!selectedListID) {
      message.info("Please select one list");
      return;
    }

    // clear redux in case users goes back from answering questions
    clearQuestionsAndAnswers();

    await getQuestions();
    history.push("/questions");
  };

  useEffect(() => {
    if (!localStorage.getItem("key")) {
      history.push("/");
    }
  }, []);

  // only load lists and all questions when the component is mounted
  useEffect(() => {
    setIsLogin();
    getQuestionLists();
  }, []);

  return (
    <CenteredBox>
      <div style={styles.wrapper}>
        <Space direction="vertical">
          <div style={{ fontSize: 32 }}>Please Choose a Topic👇</div>
          {lists.map((list, index) => (
            <Button
              key={`${list}` + index}
              size="large"
              shape="round"
              style={styles.listButton}
              onClick={() => {
                setSelectedListID(index + 1);
              }}
              type={selectedListID === index + 1 ? "primary" : "default"}
            >
              {list}
            </Button>
          ))}
          <Button
            size="large"
            type="primary"
            onClick={handleConfirmSelectionClick}
          >
            Go to questions
          </Button>
        </Space>
      </div>
    </CenteredBox>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateQuestionsToRedux(questions) {
      const action = {
        type: UPLOAD_QUESTIONS,
        questions,
      };
      dispatch(action);
    },

    clearQuestionsAndAnswers() {
      const action = {
        type: CLEAR_QUESTIONS_AND_ANSWERS,
      };
      dispatch(action);
    },

    setIsLogin() {
      const action = { type: SWITCH_USER_STATUS, isLogin: true };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(QuestionListSelection);
