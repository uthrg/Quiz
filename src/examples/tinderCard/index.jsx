import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
  HiOutlineRefresh,
} from "react-icons/hi";
import Layout from "../Layout";

const unknownWord = [];

function Tindercard({ Quiz }) {
  const [currentIndex, setCurrentIndex] = useState(Quiz.length - 1);
  const [lastDirection, setLastDirection] = useState();
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
  };

  const canSwipe = currentIndex >= 0;
  const swiped = (direction, name, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (direction === "right") {
      unknownWord.push(name);
    }

    console.log("unknownWord", unknownWord);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    console.log("childRefs[idx]", childRefs[idx]);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // if (idx - 1 < 0) {
    //   alert("");
    // }
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < Quiz.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const canGoBack = currentIndex < Quiz.length - 1;
  const goBack = async () => {
    if (!canGoBack) return;
    updateCurrentIndex(currentIndex + 1);
    await childRefs[currentIndex + 1].current.restoreCard();
    unknownWord.pop();
    console.log(unknownWord);
  };

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
      <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
      <div className="cardContainer">
        {Quiz.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.id}
            onSwipe={(dir) => swiped(dir, character.id, index)}
            onCardLeftScreen={() => outOfFrame(character.id, index)}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{ backgroundImage: "url(" + character.imgURL + ")" }}
              className="card"
            ></div>
            <Text textAlign="center" fontWeight="500" fontSize="24px">{character.answer}</Text>
          </TinderCard>
        ))}
      </div>

      <Box mt="25px" display="flex" flexDir="row">
        <Button
          m="20px"
          h="60px"
          w="120px"
          bgColor="#BFC8EA"
          isDisabled={!canSwipe && true}
          onClick={() => swipe("left")}
        >
          <HiOutlineArrowNarrowLeft />
          know
        </Button>
        <Button
          m="20px"
          h="60px"
          w="120px"
          bgColor="#BFC8EA"
          isDisabled={!canGoBack && "#c3c4d3"}
          onClick={() => goBack()}
        >
          <HiOutlineRefresh />
          Go Back
        </Button>

        {/* <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button> */}
        <Button
          m="20px"
          h="60px"
          w="150px"
          bgColor="#BFC8EA"
          isDisabled={!canSwipe && "#c3c4d3"}
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
