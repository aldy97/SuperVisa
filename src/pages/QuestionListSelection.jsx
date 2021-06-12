import React, { useEffect, useState } from "react";
import { CenteredBox } from "./Questions";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Button, Space, message } from "antd";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { UPLOAD_QUESTIONS } from "../actions/QuestionAction";

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
  // obtained from api request, list of string:
  const [lists, setLists] = useState([]);
  // index of the selected list:
  const [selectedListID, setSelectedListID] = useState(null);

  const history = useHistory();

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Token ${localStorage.getItem("key")}` },
  });

  const getQuestionLists = async () => {
    const response = await authAxios.get(`/api/question_lists/`);
    const tempLists = [];

    for (const list of response.data) {
      tempLists.push(list.name);
    }
    setLists(tempLists);
  };

  // get questions based on question list id, upload that to redux;
  const getQuestions = async () => {
    const response = await authAxios.get(
      `/api/questions/?list=${selectedListID}`
    );

    const questions = response.data;
    props.updateQuestionsToRedux(questions);
  };

  // if a question list is selected, directs it to questions page
  const handleConfirmSelectionClick = async () => {
    // executes if no list is selected by user
    if (!selectedListID) {
      message.info("Please select one list");
      return;
    }

    await getQuestions();
    history.push("/questions");
  };

  useEffect(() => {
    if (!localStorage.getItem("key")) {
      history.push("/");
    }
  });

  // only load lists and all questions when the component is mounted
  useEffect(() => {
    // const key = localStorage.getItem("key");
    // if (key) {
    //   debugger;
    getQuestionLists();
  }, []);

  return (
    <CenteredBox>
      <div style={styles.wrapper}>
        <Space direction="vertical">
          <div style={{ fontSize: 24 }}>Please choose a topic</div>
          <Space direction="horizontal">
            {lists.map((list, index) => (
              <Button
                key={`${list}` + index}
                size="large"
                style={styles.listButton}
                onClick={() => {
                  setSelectedListID(index + 1);
                }}
                type={selectedListID === index + 1 ? "primary" : "default"}
              >
                {list}
              </Button>
            ))}
          </Space>
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
  };
};

export default connect(null, mapDispatchToProps)(QuestionListSelection);
