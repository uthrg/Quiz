import React, { useState } from "react";
import { HiPlay } from "react-icons/hi";


const AudioABC = ({ Quiz, AllOptions, setWrongAnswers }) => {
  const [step, setStep] = useState(0);

  const correctOption = Quiz[step].answer;
  const otherOptions = AllOptions.filter(
    (option) => option !== correctOption
  );
  const shuffledOptions = otherOptions.sort(() => Math.random() - 0.5);
  const randomIndex = Math.floor(Math.random() * 3);
  const randomOptions = [
    ...shuffledOptions.slice(0, randomIndex),
    correctOption,
    ...shuffledOptions.slice(randomIndex, 2),
  ];

  const handleUserAnswer = (answer) => {
    const currentStepRoleAnswer = Quiz[step].answer;
    if (answer !== currentStepRoleAnswer) {
      setWrongAnswers((prev) => [...prev, Quiz[step].answer]);
    }

    if (step + 1 < Quiz.length) {
      setStep((prevStep) => prevStep + 1);
    } else {
      alert("結束");
    }
  };

  return (
    <>
      {Quiz.map(
        (items, i) =>
          step === i && (
            <div
              key={items.id}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <h3>{items.role}</h3>
              <HiPlay
                onClick={() => items.audioUrl.play()}
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          )
      )}

      {randomOptions.map((name, i) => (
        <div key={name} className="buttons_audio">
          <button onClick={() => handleUserAnswer(name)}>
            {randomOptions[i]}
          </button>
        </div>
      ))}
    </>
  );
};

export default AudioABC;
