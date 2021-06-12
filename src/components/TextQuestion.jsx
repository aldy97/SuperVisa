import React from "react";
import { Card, Input } from "antd";

const TextQuestion = (props) => {
  const { question, setResponse, answer } = props;

  const onChange = (e) => {
    const { value } = e.target;
    setResponse(value);
  };

  return (
    <Card title={question.text + "?"}>
      {!answer ? (
        <Input onChange={onChange}></Input>
      ) : (
        <Input disabled value={answer.text}></Input>
      )}
    </Card>
  );
};

export default TextQuestion;
