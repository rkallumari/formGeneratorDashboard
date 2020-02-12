import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
export const QuestionContext = createContext();

export const QuestionProvider = props => {
  const [answers, setAnswers] = useState(null);
  return (
    <QuestionContext.Provider value={{ answers, setAnswers }}>
      {props.children}
    </QuestionContext.Provider>
  );
};

QuestionProvider.propTypes = {
  children: PropTypes.node
};
