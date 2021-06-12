import React from "react";
import TextQuestion from "./TextQuestion";
import MCQuestion from "./MCQuestion";
import YesOrNoQuestion from "./YesOrNoQuestion";
import NumberQuestion from "./NumberQuestion";

// entry for rendering a specific question card depending on question type: Y/N, MC, Text or NUMBER
const QuestionCard = (props) => {
  const { question } = props;

  // only one specific question card will be mounted
  return (
    <div>
      {question.question_type === "TEXT" && (
        <TextQuestion question={question}></TextQuestion>
      )}
      {question.question_type === "MC" && (
        <MCQuestion question={question}></MCQuestion>
      )}
      {question.question_type === "YES_NO" && (
        <YesOrNoQuestion question={question}></YesOrNoQuestion>
      )}
      {question.question_type === "NUMBER" && (
        <NumberQuestion question={question}></NumberQuestion>
      )}
    </div>
  );
};

export default QuestionCard;
