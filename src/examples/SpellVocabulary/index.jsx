import React, { useState, useEffect } from "react";
import { FaPagelines, FaUndoAlt } from "react-icons/fa";

const SpellWord = ({ Quiz }) => {
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [alphabet, setAlphabet] = useState([]);
  const [step, setStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);
  const [undo, setUndo] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (Quiz.length > step) {
      const currentWord = Quiz[step].answer.split("");
      setCorrectAnswer([...currentWord]);
      const shuffled = currentWord.sort(() => Math.random() - 0.5);
      setAlphabet(shuffled);
    }
  }, [Quiz, step]);

  function WordAnswer() {
    console.log("correctAnswer", correctAnswer);
    return correctAnswer.map((char, index) => (
      <React.Fragment key={index}>
        {userAnswer[index] ? userAnswer[index] : <FaPagelines />}
      </React.Fragment>
    ));
  }

  function alphabetOptions() {
    console.log("alphabet", alphabet);
    return alphabet.map((char, index) => (
      <button
        key={index}
        style={{ margin: "5px" }}
        onClick={() => handleButtonClick(char, index)}
        disabled={disabledButtons.includes(index)}
      >
        {char}
      </button>
    ));
  }

  const handleButtonClick = (char, index) => {
    const prevUserAnswer = [...userAnswer];
    setUserAnswer((userAnswer) => [...userAnswer, char]);
    setUndo([...undo, prevUserAnswer]);
    setDisabledButtons([...disabledButtons, index]);
  };

  const handleUndo = () => {
    if (undo.length > 0) {
      const prevUserAnswer = undo[undo.length - 1];
      setUserAnswer(prevUserAnswer);
      setUndo(undo.slice(0, undo.length - 1));
      setDisabledButtons(disabledButtons.slice(0, disabledButtons.length - 1));
    }
  };

  const compare = () => {
    let isCorrect = true;
    for (let i = 0; i < correctAnswer.length; i++) {
      if (correctAnswer[i] !== userAnswer[i]) {
        isCorrect = false;
        setShowAnswer(true);
        setTimeout(() => {
          handleNextButton();
        }, 1500);
        return;
      }
    }
    if (isCorrect) {
      handleNextButton();
    }
  };

  const handleNextButton = () => {
    setStep(step + 1);
    setUserAnswer([]);
    setUndo([]);
    setDisabledButtons([]);
    setShowAnswer(false);
  };

  return (
    <>
      {Quiz.map(
        (items, i) =>
          step === i && (
            <div key={items.id} style={{ display: "flex" }}>
              <h3>{items.role}</h3>
              <div>
                {WordAnswer()}
              </div>
              <div>{alphabetOptions()}</div>
              {showAnswer && (
                <div style={{ color: "red" }}>{Quiz[step].answer}</div>
              )}{" "}
              {/* 顯示答案 */}
              <FaUndoAlt
                style={{ marginTop: "20px", cursor: "pointer" }}
                onClick={handleUndo}
              />
              <button
                style={{
                  width: "40px",
                  height: "20px",
                  borderRadius: "5px",
                  marginTop: "20px",
                }}
                onClick={compare}
              >
                Next
              </button>
            </div>
          )
      )}
    </>
  );
};

export default SpellWord;
