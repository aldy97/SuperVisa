import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { authAxios } from "../utils/authAxios";
import { useHistory } from "react-router";

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
const QuestionListSelection = () => {
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

  const getQuestions = async () => {
    const response = await authAxios.get(`/api/questions/`);
    const questions = response.data;
  };

  // if a question list is selected, directs it to questions page
  const handleConfirmSelectionClick = async () => {
    if (!selectedListID) {
      message.info("Please select one list");
      return;
    }

    history.push("/questions");
  };

  // only load lists and all questions when the component is mounted
  useEffect(() => {
    getQuestionLists();
    getQuestions();
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

export default QuestionListSelection;
