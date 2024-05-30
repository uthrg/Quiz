import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
  display: "inline-block",
  letterSpacing: "20px",
  fontSize: "20px",
  textAlign: "center",
};

const Cards = ({ id, char, moveWord, index }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: "char",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  // console.log("item.id", id);

  const [{ handlerId }, drop] = useDrop({
    accept: "char",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // const hoverBoundingRect = ref.current.getBoundingClientRect();

      // const hoverMiddleY =
      //   (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // const clientOffset = monitor.getClientOffset();

      // const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      //   return;
      // }
      // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      //   return;
      // }
      
      // console.log("dragIndex", dragIndex);
      // console.log("hoverIndex", hoverIndex);
      // Time to actually perform the action
      moveWord(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  // console.log("isDragging: ", isDragging);
  // console.log('id', id)
  // console.log('index', index)
  return (
    <h3
      ref={ref}
      style={{ ...style, opacity: isDragging ? 0 : 1 }}
      data-handler-id={handlerId}
    >
      {char}
    </h3>
  );
};

export default Cards;
