import React, {useRef} from "react";
import SVGDrawer from "./SVGDrawer";

const Draggable = ({ children, dragObject, onDragStart, onDragEnd, onAddNode }) => {

  let dragElementRef = useRef();
  let dragOffsetRef = useRef([0,0]);

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

  const onTouchStart = (e)=> {
    e.stopPropagation();

    // Get the first touch (you can touch with multiple fingers)
    let touch = e.changedTouches[0];

    // Get the block coordinates
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    // Find the offset of the mouse from those coordinates.
    const offset = [
      touch.clientX - currentTargetRect.left,
      touch.clientY - currentTargetRect.top
    ];

    // Pass the drag data
    onDragStart({ dragObject, offset });

    const dragedElement = e.currentTarget.cloneNode(true);
    dragedElement.style.position = "absolute";
    dragedElement.style.left = (touch.clientX - offset[0] - 5) +"px";
    dragedElement.style.top = (touch.clientY - offset[1] - 5) +"px";
    dragedElement.id = "current-dragged-object";
    document.body.appendChild(dragedElement);
    dragElementRef.current = dragedElement;
    dragOffsetRef.current = offset;
  };

  const onTouchMove = (e)=>{
    e.stopPropagation();

    // Get the first touch (you can touch with multiple fingers)
    let touch = e.changedTouches[0];

    dragElementRef.current.style.left = (touch.clientX - dragOffsetRef.current[0] - 5 )+"px";
    dragElementRef.current.style.top = (touch.pageY - dragOffsetRef.current[1] - 5)+"px";

    if (SVGDrawer.isOverDropArea(dragElementRef.current.getBoundingClientRect())) {
      SVGDrawer.dragOver();
    } else {
      SVGDrawer.dragLeave();
    }
  };

  const onTouchEnd = (e) => {
    e.stopPropagation();
    onDragEnd();
    SVGDrawer.dragLeave();

    const dragElementRect = dragElementRef.current.getBoundingClientRect();
    if (SVGDrawer.isOverDropArea(dragElementRect)) {
      onAddNode(dragElementRect.left + dragOffsetRef.current[0],dragElementRect.top + dragOffsetRef.current[1]);
    }

    dragElementRef.current.remove();
    dragElementRef.current = null;
    dragOffsetRef.current = null;
  };

  return (
    <div
      className="draggable"
      draggable={true}
      onDragStart={onDragStarting}
      onDragEnd={onDragEnding}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
};

export default Draggable;
