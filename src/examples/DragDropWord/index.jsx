import React, { useState, useEffect, useCallback } from "react";
import { Button, useToast, Box } from "@chakra-ui/react";
import update from "immutability-helper";
import Card from "./Card";
import Layout from "../Layout";
import { nanoid } from "nanoid";
import { Navigate } from "react-router-dom";

function DragDrop({ Quiz, gameRecord, setGameRecord }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alphabet, setAlphabet] = useState([]);
  const [previousQuestion, ]= useState(gameRecord.game2?.mistakeValue || [])
  const [question, setQuestion] = useState(Quiz.filter((prev)=> previousQuestion.includes(prev.answer)))
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const toast = useToast();

  useEffect(() => {
    if (question.length <= 2) {
      const remainingQuestions = Quiz.filter(
        (prev) => !question.includes(prev)
      );
      const randomQuestion = remainingQuestions.sort(()=>Math.random() * remainingQuestions.length) 
      const chooseQuestion = randomQuestion.slice(0, 3-question.length)
      setQuestion([...question, ...chooseQuestion]);
    }
  }, []);

  useEffect(()=>{
    if (question[currentIndex]) {
      const currentWord = question[currentIndex].answer.split("");
      setCorrectAnswer([...currentWord]);
      const shuffled = currentWord.sort(() => Math.random() - 0.5);
      setAlphabet(shuffled.map((char) => ({ id: nanoid(), char })));
    }
  },[currentIndex])

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
    const isCorrect = userAnswer === question[currentIndex].answer;
    if(!isCorrect){
      setGameRecord((prev) => ({
        ...prev,
        game3: {
          mistakeValue: [...(prev.game1.mistakeValue || []), question[currentIndex].answer],
          isComplete: false,
        },
      }));
    }

    toast({
      title: isCorrect
        ? "Correct"
        : `Correct answer: ${question[currentIndex].answer}`,
      status: isCorrect ? "success" : "error",
      duration: 2000,
      isClosable: true,
    });


    setTimeout(() => {
      if (currentIndex + 1 < question.length) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setCorrectAnswer([]);
        setAlphabet([]);
      }
      if(currentIndex + 1 === question.length){
        setGameRecord((prevState) => ({
          ...prevState,
          game3: {
            ...prevState.game3,
            isComplete: true,
          },
        }));
      }
    }, 2500);
  };

  if (!gameRecord.game2.isComplete) {
    return <Navigate to="/AudioABC" />;
  }  
  if (gameRecord.game3.isComplete) {
    return <Navigate to="/Record" />;
  }

  return (
    <>
      <Layout />
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box display="flex">
          {alphabet.map((item, index) => (
            <Card
              key={item.id}
              id={item.id}
              char={item.char}
              moveWord={moveWord}
              index={index}
            />
          ))}
        </Box>
        <Button mt="20px" p="20px" onClick={compare}>
          Next
        </Button>
      </Box>
    </>
  );
}

export default DragDrop;
