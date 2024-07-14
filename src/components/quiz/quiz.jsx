import { useCallback, useState } from 'react';

import QUESTIONS from '../../constants/questions.js';
import Question from '../question/question.jsx';
import Summary from '../summary/summary.jsx';

const Quiz = () => {
  const [answers, setAnswers] = useState([]);

  const activeQuestionIndex = answers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setAnswers((prevState) => [...prevState, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (quizIsComplete) {
    return <Summary userAnswers={answers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
};

export default Quiz;
