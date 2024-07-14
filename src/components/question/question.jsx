import React, { useState } from 'react';
import QuestionTimer from '../quiz/question-timer.jsx';
import Answers from '../answers/answers.jsx';
import Questions from '../../constants/questions.js';

const Question = ({ onSelectAnswer, questionIndex, onSkipAnswer }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  const handleSelectAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: Questions[questionIndex].answers[0] === answer
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = '';

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{Questions[questionIndex].text}</h2>
      <Answers
        answers={Questions[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
