import React from "react";

const Draggable = ({ children, dragObject, onDragStart, onDragEnd }) => {
  const onDragStarting = (e) => {
    // Get the block coordinates
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    // Find the offset of the mouse from those coordinates.
    const offset = [
      e.clientX - currentTargetRect.left,
      e.clientY - currentTargetRect.top
    ];

    // Pass the drag data
    onDragStart({ dragObject, offset });
  };

  const onDragEnding = (e) => {
    e.stopPropagation();
    onDragEnd();
  };

  return (
    <div
      className="draggable"
      draggable={true}
      onDragStart={onDragStarting}
      onDragEnd={onDragEnding}
    >
      {children}
    </div>
  );
};

export default Draggable;
