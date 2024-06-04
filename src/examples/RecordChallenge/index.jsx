import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { Button, Text, Box, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Layout from "../Layout";
import { Navigate } from "react-router-dom";

const RecordChallenge = ({ Quiz, gameRecord, setGameRecord }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [previousQuestion, ]= useState(gameRecord.game3?.mistakeValue || [])
  const [question, setQuestion] = useState(Quiz.filter((prev)=> previousQuestion.includes(prev.answer)))
  const recorderControls = useAudioRecorder();
  const toast = useToast()

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


  const sendAudioForTranscription = async (audioBlob) => {
    const audioData = await blobToBase64(audioBlob);
    const binaryString = window.atob(audioData);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const audioFile = new Blob([bytes], { type: "audio/wav" });
    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("model", "whisper-1");
    formData.append("language", "zh");
    try {
      const response = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            // Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("API response:", await response.json());
      } else {
        const data = await response.json();
        // setUserRecord(data.text)
        setComparisonResult(compare(data.text));
        console.log("Transcribed text:", data.text);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const compare = (userText) => {
    const isCorrect = userText === question[currentIndex]?.answer;
    if(!isCorrect){
      setGameRecord((prev)=>({...prev, game4:{mistakeValue:[...(prev.game4.mistakeValue || []), question[currentIndex].answer], isComplete:false}}))
    }

    let text = question[currentIndex].answer;
    let userWord = userText.split("");
    let referenceWords = text.split("");
    const result = userWord.map((word, index) => {
      if (word === referenceWords[index]) {
        return (
          <Text key={index} color="green">
            {word}{" "}
          </Text>
        );
      } else {
        return (
          <Text key={index} color="red">
            {word}{" "}
          </Text>
        );
      }
    });

    return result;
  };

  // const handleRecordingStart = () => {
  //   setIsRecording(true);
  //   setComparisonResult(null);
  // };

  const handleNextClick = () => {
    if(currentIndex+1 < question.length){
      setCurrentIndex(currentIndex + 1);
      setComparisonResult(null);
    }else{
      toast({
        title: 'last!!',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  if(!gameRecord.game3.isComplete){
    return <Navigate to="/DragDrop"/>
  }

  return (
    <Box>
      <Layout />
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Text m="10px 20px" fontSize="40px" fontWeight="bold">
            {question[currentIndex]?.answer}
          </Text>
          <AudioRecorder
            onRecordingComplete={(blob) => sendAudioForTranscription(blob)}
            recorderControls={recorderControls}
          />
        </Box>
        <Box display="Flex">{comparisonResult}</Box>
        <Button
          m="20px"
          onClick={handleNextClick}
          isDisabled={currentIndex + 1 >= Quiz.length}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default RecordChallenge;
