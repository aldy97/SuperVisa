import React, { useState } from "react";
import { Card, Input } from "antd";

const NumberQuestion = (props) => {
  const { question, setResponse, answer } = props;

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
        <Input onChange={onChange}></Input>
      ) : (
        <Input value={answer.text} disabled></Input>
      )}
    </Card>
  );
};

export default NumberQuestion;
