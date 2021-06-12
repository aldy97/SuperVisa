import React from "react";
import { Card, Button, Space } from "antd";

const YesOrNoQuestion = (props) => {
  const { question, response, setResponse, answer } = props;

  const onButtonClick = (yes) => {
    setResponse(yes ? "yes" : "no");
  };

  return (
    <Card title={question.text + "?"}>
      <Space direction="horizontal">
        {!answer ? (
          <>
            <Button
              type={response === "yes" ? "primary" : "default"}
              onClick={() => onButtonClick(true)}
            >
              Yes
            </Button>
            <Button
              type={response === "no" ? "primary" : "default"}
              onClick={() => onButtonClick(false)}
            >
              No
            </Button>
          </>
        ) : (
          <div>{answer.text.toUpperCase()}</div>
        )}
      </Space>
    </Card>
  );
};

export default YesOrNoQuestion;
