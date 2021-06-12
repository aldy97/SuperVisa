import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { authAxios } from "../utils/authAxios";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { UPLOAD_QUESTIONS } from "../actions/QuestionAction";

const styles = {
  wrapper: { textAlign: "center" },
  listButton: {
    height: 64,
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

  // only load lists and all questions when the component is mounted
  useEffect(() => {
    getQuestionLists();
  }, []);

  return (
    <div style={styles.wrapper}>
      <div>
        {lists.map((list, index) => (
          <Button
            key={`${list}` + index}
            style={styles.listButton}
            onClick={() => {
              setSelectedListID(index + 1);
            }}
            type={selectedListID === index + 1 ? "primary" : "default"}
          >
            {list}
          </Button>
        ))}
      </div>
      <Button size="large" type="primary" onClick={handleConfirmSelectionClick}>
        Go to questions
      </Button>
    </div>
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
