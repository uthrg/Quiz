import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import { Box, Button, Text } from "@chakra-ui/react";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import Layout from "../Layout";
import { Navigate } from "react-router-dom";

function Tindercard({ Quiz, gameRecord, setGameRecord }) {
  const [currentIndex, setCurrentIndex] = useState(Quiz.length - 1);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(Quiz.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
    if (val === -1) {
      setTimeout(()=>(
        setGameRecord((prevState) => ({
          ...prevState,
          game1: {
            ...prevState.game1,
            isComplete: true,
          },
        }))
      ), 1500)
    }
  };

  const swiped = (direction, index, name) => {
    if (direction === "right") {
      setGameRecord((prev) => ({
        ...prev,
        game1: {
          mistakeValue: [...(prev.game1.mistakeValue || []), name],
          isComplete: false,
        },
      }));
    }
    updateCurrentIndex(index - 1);
  };

  const swipe = async (dir) => {
    await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
  };

  const canSwipe = currentIndex >= 0;

  if (gameRecord.game1.isComplete) {
    return <Navigate to="/AudioABC" />;
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <Layout />
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <div className="cardContainer">
          {Quiz.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={character.id}
              onSwipe={(dir) => swiped(dir, index, character.answer)}
              preventSwipe={["up", "down"]}
            >
              <div
                style={{ backgroundImage: "url(" + character.imgURL + ")" }}
                className="card"
              ></div>
              <Text textAlign="center" fontWeight="500" fontSize="24px">
                {character.answer}
              </Text>
            </TinderCard>
          ))}
        </div>

        <Box mt="25px" display="flex" flexDir="row">
          <Button
            m="20px"
            h="60px"
            w="120px"
            bgColor="#BFC8EA"
            isDisabled={!canSwipe}
            onClick={() => swipe("left")}
          >
            <HiOutlineArrowNarrowLeft />
            know
          </Button>

          <Button
            m="20px"
            h="60px"
            w="150px"
            bgColor="#BFC8EA"
            isDisabled={!canSwipe}
            onClick={() => swipe("right")}
          >
            Don't know
            <HiOutlineArrowNarrowRight />
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Tindercard;
