import React, { useState } from "react";
import { Card, Checkbox } from "antd";

const MCQuestion = (props) => {
  const { question, setResponse, answer } = props;
  const [currentOption, setCurrentOption] = useState(null);

  const onChange = (option) => {
    setCurrentOption(option);
    setResponse(option);
  };

  return (
    <Card title={question.text + "?"}>
      {!answer &&
        question.choice_list.map((option) => {
          return (
            <Checkbox
              checked={option === currentOption}
              onChange={() => {
                onChange(option);
              }}
            >
              {option}
            </Checkbox>
          );
        })}
      {answer && <Checkbox checked>{answer.text}</Checkbox>}
    </Card>
  );
};

export default MCQuestion;
