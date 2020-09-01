import React from "react";
import Draggable from "./Draggable";

const blocks = [
  { name: "A", color: "blue" },
  { name: "B", color: "pink" },
  { name: "C", color: "green" },
  { name: "D", color: "yellow" },
  { name: "E", color: "purple" }
];

const DraggableBlocks = ({ setDragData }) => {
  const onDragStart = (dragData) => {
    setDragData(dragData);
  };

  const onDragEnd = () => {};

  return (
    <div className="dragging-blocks">
      {blocks.map((b) => (
        <Draggable
          key={b.name}
          dragObject={b}
          onDragStart={(dragData) => onDragStart(dragData)}
          onDragEnd={() => onDragEnd()}
        >
          <div className="block" style={{ backgroundColor: b.color }}>
            {b.name}
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default DraggableBlocks;
