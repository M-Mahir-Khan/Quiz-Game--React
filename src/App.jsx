// /src/App.jsx

import React, { useState, useEffect } from 'react';
import './App.css';

// Question Data (Easy, Medium, Hard)
const easyQuestions = [
  { question: 'What is the capital of France?', options: ['Paris', 'London', 'Rome', 'Berlin'], answer: 'Paris' },
  { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' },
  { question: 'Which planet is closest to the Sun?', options: ['Mercury', 'Venus', 'Earth', 'Mars'], answer: 'Mercury' },
];

const mediumQuestions = [
  { question: 'What is the largest continent?', options: ['Asia', 'Africa', 'Europe', 'North America'], answer: 'Asia' },
  { question: 'What is the square root of 144?', options: ['10', '12', '14', '16'], answer: '12' },
  { question: 'Who is known as the Father of Computers?', options: ['Charles Babbage', 'Albert Einstein', 'Isaac Newton', 'Nikola Tesla'], answer: 'Charles Babbage' },
];

const hardQuestions = [
  { question: 'What is the derivative of sin(x)?', options: ['cos(x)', 'tan(x)', 'sec(x)', 'sin(x)'], answer: 'cos(x)' },
  { question: 'What is the capital of Mongolia?', options: ['Ulaanbaatar', 'Beijing', 'Tokyo', 'Seoul'], answer: 'Ulaanbaatar' },
  { question: 'Which programming language is known for its use in web development?', options: ['C', 'C++', 'JavaScript', 'Java'], answer: 'JavaScript' },
];

const App = () => {
  const [questionsList, setQuestionsList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [difficulty, setDifficulty] = useState('easy'); // Default difficulty level
  const [highScore, setHighScore] = useState(0);

  // Set questions based on selected difficulty
  useEffect(() => {
    if (difficulty === 'easy') {
      setQuestionsList(easyQuestions);
    } else if (difficulty === 'medium') {
      setQuestionsList(mediumQuestions);
    } else {
      setQuestionsList(hardQuestions);
    }
  }, [difficulty]);

  // Timer countdown
  useEffect(() => {
    if (timerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleNextQuestion(); // Move to the next question when time runs out
    }
  }, [timer, timerActive]);

  // Handle the answer selection
  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questionsList[currentIndex].answer) {
      setScore(score + 1);
    }
    setTimer(30); // Reset timer
    handleNextQuestion();
  };

  // Handle the next question
  const handleNextQuestion = () => {
    if (currentIndex < questionsList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimer(30); // Reset timer for the next question
    } else {
      setShowResult(true);
      setTimerActive(false);
      setHighScore(Math.max(score, highScore)); // Update high score if necessary
    }
  };

  // Restart the quiz
  const handleRestart = () => {
    setScore(0);
    setCurrentIndex(0);
    setShowResult(false);
    setTimer(30);
    setTimerActive(true);
    setDifficulty('easy'); // Reset to easy level
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <div className="difficulty-selector">
            <label>Select Difficulty: </label>
            <select onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="question-container">
            <h2>{questionsList[currentIndex]?.question}</h2>
            <div className="options">
              {questionsList[currentIndex]?.options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)} className="option-btn">
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="timer">Time Left: {timer}s</div>
          <div className="score">Score: {score}</div>
          <div className="high-score">High Score: {highScore}</div>
        </>
      ) : (
        <div className="result">
          <h2>Game Over</h2>
          <p>Your Score: {score}</p>
          <p>High Score: {highScore}</p>
          <button onClick={handleRestart} className="restart-btn">
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
