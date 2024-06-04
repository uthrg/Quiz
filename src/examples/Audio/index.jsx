import React, { useState, useEffect } from "react";
import { HiPlay } from "react-icons/hi";
import { Button, Box, Text, useToast } from "@chakra-ui/react";
import Layout from "../Layout";
import { Navigate } from "react-router-dom";

const AudioABC = ({ Quiz, AllOptions, gameRecord, setGameRecord }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [randomOptions, setRandomOptions] = useState([]);
  const [previousQuestion, ]= useState(gameRecord.game1?.mistakeValue || [])
  const [question, setQuestion] = useState(Quiz.filter((prev)=> previousQuestion.includes(prev.answer)))
  const toast = useToast();

  useEffect(()=> {
    if (question.length <= 2) {
      const remainingQuestions = Quiz.filter(
        (prev) => !question.includes(prev)
      );
      const randomQuestion = remainingQuestions.sort(()=>Math.random() * remainingQuestions.length) 
      const chooseQuestion = randomQuestion.slice(0, 3-question.length)
      setQuestion([...question, ...chooseQuestion]);
    }else{
      const randomQuestion = question.sort(()=>Math.random() - 0.3) 
      const chooseQuestion = randomQuestion.slice(0, 3)
      setQuestion([...chooseQuestion]);
      const remainingQuestion = randomQuestion.filter((prev) => !chooseQuestion.includes(prev))
      setGameRecord((prev) => ({
        ...prev,
        game2: {
          mistakeValue:[...remainingQuestion.map((item) => item.answer)],
          isComplete: false,
        },
    }))
    }
  },[])

  const correctOption = question[currentIndex]?.answer

  useEffect(() => {
    if (!correctOption) return;
    const otherOptions = AllOptions.filter(
      (option) => option !== correctOption
    );
    const shuffledOptions = otherOptions.sort(() => Math.random() - 0.5);
    const randomIndex = Math.floor(Math.random() * 3);
    const newRandomOptions = [
      ...shuffledOptions.slice(0, randomIndex),
      correctOption,
      ...shuffledOptions.slice(randomIndex, 2),
    ];
    setRandomOptions(newRandomOptions);
  }, [currentIndex, correctOption]);


  const handleUserAnswer = (userAnswer) => {
    const isCorrect = userAnswer === correctOption;
    setIsButtonDisabled(true);

    if (!isCorrect) {
      setGameRecord((prev) => ({
        ...prev,
        game2: {
          mistakeValue: [...(prev.game2.mistakeValue || []), correctOption],
          isComplete: false,
        },
      }));
    }

    toast({
      title: isCorrect ? "Correct" : `Correct answer: ${correctOption}`,
      status: isCorrect ? "success" : "error",
      duration: 2000,
      isClosable: true,
    });

    setTimeout(() => {
      setIsButtonDisabled(false);
      if (currentIndex + 1 < question.length) {
        setCurrentIndex((prev) => prev + 1);
      }
      if (currentIndex + 1 === question.length) {
        setGameRecord((prevState) => ({
          ...prevState,
          game2: {
            ...prevState.game2,
            isComplete: true,
          },
        }));
      }
    }, 2500);
  };

  if (!gameRecord.game1?.isComplete) {
    return <Navigate to="/Tinder" />;
  }

  if (gameRecord.game2?.isComplete) {
    return <Navigate to="/DragDrop" />;
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
        {question.map(
          (items, i) =>
            currentIndex === i && (
              <Box key={items.id} display="flex">
                <Text m="auto" fontSize="24px" fontWeight="500">
                  {items.role}
                </Text>
                <HiPlay
                  onClick={() => items.audioUrl.play()}
                  style={{ width: "50px", height: "50px" }}
                />
              </Box>
            )
        )}

        {randomOptions.map((name, i) => (
          <Box key={name}>
            <Button
              m="10px"
              w="100px"
              onClick={() => handleUserAnswer(name)}
              isDisabled={isButtonDisabled}
            >
              {name}
            </Button>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default AudioABC;
