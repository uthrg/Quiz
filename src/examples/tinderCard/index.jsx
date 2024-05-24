import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import { HiOutlineArrowNarrowLeft,HiOutlineArrowNarrowRight, HiOutlineRefresh } from "react-icons/hi";

const unknownWord = [];


function Tindercard({Quiz}) {
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
    setCurrentIndex(val)
    currentIndexRef.current = val
  }


  const canSwipe = currentIndex >= 0;
  const swiped = (direction, name, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1)
    if (direction === "right") {
      unknownWord.push(name);
    }

    console.log("unknownWord", unknownWord);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    console.log("childRefs[idx]", childRefs[idx]);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    if(idx - 1 < 0){
      alert("")
    }
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < Quiz.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const canGoBack = currentIndex < Quiz.length - 1
  const goBack = async () => {
    if (!canGoBack) return
    updateCurrentIndex(currentIndex + 1)
    await childRefs[currentIndex + 1].current.restoreCard()
    unknownWord.pop()
    console.log(unknownWord)
  }

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
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
            <h3 style={{ color:"rgba(155, 155, 155)" }}>{character.role}</h3>
          </TinderCard>
        ))}
      </div>

      <div className="buttons">
        <button
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: !canSwipe && "#c3c4d3",
          }}
          onClick={() => swipe("left")}
        >
          <HiOutlineArrowNarrowLeft />
          know
        </button>
        <button
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: !canGoBack && "#c3c4d3",
          }}
          onClick={() => goBack()}
        >
          <HiOutlineRefresh/>
          Go Back
        </button>
        
        {/* <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button> */}
        <button
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: !canSwipe && "#c3c4d3",
          }}
          onClick={() => swipe("right")}
        >
          <HiOutlineArrowNarrowRight />
          Don't know
        </button>
      </div>
    </div>
  );
}

export default Tindercard;
