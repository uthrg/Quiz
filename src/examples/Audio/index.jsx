import React, { useState } from "react";
import { HiPlay } from "react-icons/hi";
import { Button, Alert, Box, Text, useToast } from "@chakra-ui/react";
import Layout from "../Layout";


const AudioABC = ({ Quiz, AllOptions }) => {
  const [step, setStep] = useState(0);

  const toast = useToast();

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
    const isCorrect = answer === Quiz[step].answer;
    toast({
      position: "top",
      title: isCorrect
        ? "Correct"
        : `Correct answer: ${Quiz[step].answer}`,
      status: isCorrect ? "success" : "error",
      duration: 2000,
      isClosable: true,
    });
    setTimeout(()=>{
      if (step + 1 < Quiz.length) {
        setStep((prevStep) => prevStep + 1);
      }
    }, 2500)
  };


  return (
    <>
    <Layout />
    <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
      {Quiz.map(
        (items, i) =>
          step === i && (
            <Box
              key={items.id}
              display="flex"
            >
              <Text m="auto" fontSize="24px" fontWeight="500">{items.role}</Text>
              <HiPlay
                onClick={() => items.audioUrl.play()}
                style={{ width: "50px", height: "50px"}}
              />
            </Box>
          )
      )}

      {randomOptions.map((name, i) => (
        <Box key={name}>
          <Button m="10px" w="100px" onClick={() => handleUserAnswer(name)}>
            {randomOptions[i]}
          </Button>
        </Box>
      ))}
      </Box>
    </>
  );
};

export default AudioABC;
