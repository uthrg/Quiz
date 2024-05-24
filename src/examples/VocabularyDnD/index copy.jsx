import React, { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import Picture from "./Picture";
import ShuffledText from "./ShuffledText";
import update from "immutability-helper";

function DragDrop({ Quiz }) {
  const [board, setBoard] = useState([]);

  const [, drop] = useDrop(
    () => ({
      accept: "image",
      drop: (item) => addImageToBoard(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [board]
  );

  const addImageToBoard = (id) => {
    const pictureList = Quiz.filter((picture) => id === picture.id);
    const isExist = board.some((pic) => pic.id === pictureList[0].id);
    if (!isExist) {
      setBoard((board) => [...board, pictureList[0]]);
    }
  };

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setBoard((prevBoard) =>
      update(prevBoard, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevBoard[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <>
    
      <div style={{ display: "flex" }}>
        <div className="Pictures" style={{ display: "flex" }}>
          {Quiz.map((items) => {
            return <Picture url={items.imgURL} id={items.id} key={items.id} />;
          })}
        </div>
        <div
          className="Board"
          ref={drop}
          style={{
            width: "750px",
            height: "300px",
            border: "2px dotted black",
            position: "relative",
            display: "flex",
          }}
        >
          {board.map((picture, index) => (
            <Picture
              key={picture.id}
              id={picture.id}
              url={picture.imgURL}
              moveCard={moveCard}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default DragDrop;
