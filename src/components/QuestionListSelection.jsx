import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

// config axios for sending get request with authetication token
const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Token ${localStorage.getItem("key")}` },
});

const QuestionListSelection = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  // fetch all types of question lists
  const getQuestionLists = async () => {
    const response = await authAxios.get(`/api/question_lists/`);
    const tempLists = [];
    for (const list of response.data) {
      tempLists.push(list.name);
    }
    setLists(tempLists);
  };

  // only executed when the component is mounted
  useEffect(() => {
    getQuestionLists();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        {lists.map((list, index) => (
          <Button
            style={{
              height: 64,
              marginLeft: 32,
              marginRight: 32,
              marginBottom: 32,
            }}
            onClick={() => {
              setSelectedList(index);
            }}
            type={selectedList === index ? "primary" : "default"}
          >
            {list}
          </Button>
        ))}
      </div>
      <Button size="large" type="primary">
        Go to questions
      </Button>
    </div>
  );
};

export default QuestionListSelection;
