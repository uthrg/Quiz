import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button, useToast } from "@chakra-ui/react";
import update from "immutability-helper";
import Card from "./Card";
import { nanoid } from "nanoid";

function DragDrop({ Quiz }) {
  const [alphabet, setAlphabet] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toast = useToast();

  useEffect(() => {
    if (currentIndex + 1 === Quiz[currentIndex].id) {
      const currentWord = Quiz[currentIndex].answer.split("");
      setCorrectAnswer([...currentWord]);
      const shuffled = currentWord.sort(() => Math.random() - 0.5);
      setAlphabet(shuffled.map((char) => ({ id: nanoid(), char })));
    }
  }, [currentIndex]);

  const moveWord = useCallback((dragIndex, hoverIndex) => {
    setAlphabet((prevWord) =>
      update(prevWord, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevWord[dragIndex]],
        ],
      })
    );
  }, []);
  // console.log("alphabet", alphabet);
  
  const compare = () => {
    const userAnswer = alphabet
      .map((char) => char.char)
      .join("")
      .trim();
    // console.log(" Quiz.answer", Quiz[currentIndex].answer);
    // console.log(" userAnswer", userAnswer);
    const isCorrect = userAnswer === Quiz[currentIndex].answer;

    toast({
      position: 'top',
      title: isCorrect? "Correct":`Correct answer: ${Quiz[currentIndex].answer}`,
      status: isCorrect? "success":"error",
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => {
      if(currentIndex +1 < Quiz.length ){
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setCorrectAnswer([]);
        setAlphabet([]);
      }
    }, 2500);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {alphabet.map((item, index) => (
          <Card
            key={item.id}
            id={item.id}
            char={item.char}
            moveWord={moveWord}
            index={index}
          />
        ))}
      </div>
      <Button mt="20px" p="20px" onClick={compare}>Next</Button>
    </>
  );
}

export default DragDrop;
