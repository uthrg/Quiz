import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import { SlActionRedo, SlActionUndo } from "react-icons/sl";

const Advance = ({Quiz}) => {
  const [currentIndex, setCurrentIndex] = useState(Quiz.length - 1);
  const [lastDirection, setLastDirection] = useState();

  // console.log(Quiz)

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(Quiz.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const onSwipe = (direction, itemName, i) => {
    console.log(`You swiped ${itemName}  ${direction} ${i}`);
    setCurrentIndex(i - 1);
    currentIndexRef.current = i - 1;
    setLastDirection(direction);
  };

  const onCardLeftScreen = (name, i) => {
    console.log(name + " left the screen");
    // setCurrentIndex(i + 1);
    console.log("childRefs: ", childRefs[i]);
    currentIndexRef.current >= i && childRefs[i].current.restoreCard();
  };

  const canSwipe = currentIndex >= 0;
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < Quiz.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <>
        <div style={{ position: "relative", width: "500px", height: "500px" }}>
          {Quiz.map((item, index) => (
            <TinderCard
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              ref={childRefs[index]}
              key={item.id}
              onSwipe={(dir) => onSwipe(dir, item.id, index)}
              onCardLeftScreen={() => onCardLeftScreen(item.id, index)}
              preventSwipe={["up", "down"]}
            >
              <div
                style={{
                  position: "relative",
                  width: "500px",
                  height: "500px",
                  borderRadius: "20px",
                  boxShadow:"0px 0px 60px 0px rgba(0,0,0,0.30)",
                  backgroundImage: "url(" + item.imgURL + ")",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h3
                  style={{
                    position: "absolute",
                    bottom: "0",
                    margin: "10px",
                    color: "#fff",
                  }}
                >
                  {item.role}
                </h3>
              </div>
            </TinderCard>
          ))}
        </div>
        <div style={{ display: "flex", margin: "20px auto" }}>
          <button
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "25px",
              width: "100px",
              padding: "8px 12px",
              backgroundColor: "#ffecca",
              borderRadius: "8px",
              backgroundPosition: "center",
            }}
            onClick={() => swipe("left")}
          >
            <SlActionUndo />
            know
          </button>
          <button
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100px",
              padding: "8px 12px",
              backgroundColor: "#ffe",
              borderRadius: "8px",
            }}
            onClick={() => swipe("right")}
          >
            <SlActionRedo />
            don't know
          </button>
        </div>
    </>
  );
};

export default Advance;
