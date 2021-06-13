import React from "react";
import { Card, Input } from "antd";

const NumberQuestion = (props) => {
  const { question, response, setResponse, answer } = props;

  // In NumberQuestion, only numbers allowed in the answer
  const onChange = (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(value)) {
      setResponse(parseInt(value));
    }
  };

  return (
    <Card title={question.text + "?"}>
      {!answer ? (
        <Input
          value={Number.isNaN(response) ? "" : response}
          onChange={onChange}
        ></Input>
      ) : (
        <div>{answer.text}</div>
      )}
    </Card>
  );
};

export default NumberQuestion;
