import React, { useState } from "react";
import { Card, Button, Space } from "antd";

const YesOrNoQuestion = (props) => {
  const { question, setResponse, answer } = props;

  const [isYes, setIsYes] = useState(null);

  const onButtonClick = (yes) => {
    setResponse(yes ? "yes" : "no");
    setIsYes(yes);
  };

  return (
    <Card title={question.text + "?"}>
      <Space direction="horizontal">
        {!answer ? (
          <>
            <Button
              type={isYes ? "primary" : "default"}
              onClick={() => onButtonClick(true)}
            >
              Yes
            </Button>
            <Button
              type={isYes === false ? "primary" : "default"}
              onClick={() => onButtonClick(false)}
            >
              No
            </Button>
          </>
        ) : (
          <Button type="primary">{answer.text}</Button>
        )}
      </Space>
    </Card>
  );
};

export default YesOrNoQuestion;
