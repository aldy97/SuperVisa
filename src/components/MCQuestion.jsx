import React from "react";
import { Card, Checkbox } from "antd";

const MCQuestion = (props) => {
  const { question, setResponse, answer, response } = props;

  const onChange = (option) => {
    setResponse(option);
  };

  return (
    <Card title={question.text + "?"}>
      {!answer &&
        question.choice_list.map((option) => {
          return (
            <Checkbox
              key={option}
              checked={option === response}
              onChange={() => {
                onChange(option);
              }}
            >
              {option}
            </Checkbox>
          );
        })}
      {answer && <div>{answer.text}</div>}
    </Card>
  );
};

export default MCQuestion;
