import React, { useEffect } from "react";

import SVGDrawer from "./SVGDrawer";

const SVGArea = ({ nodes, onAddNode}) => {
  useEffect(() => {
    SVGDrawer.draw(nodes);
  }, []);

  useEffect(() => {
    SVGDrawer.draw(nodes);
  }, [nodes.length]);

  const onDragOver = (e) => {
    e.preventDefault();
    SVGDrawer.dragOver();
  };

  const onDragLeave = () => {
    SVGDrawer.dragLeave();
  };

  const onDrop = (e) => {
    e.stopPropagation();
    SVGDrawer.dragLeave();

    onAddNode(e.clientX, e.clientY);

    return false;
  };

  return (
    <div
      className="svgContainer"
      onDrop={(e) => onDrop(e)}
      onDragLeave={(e) => onDragLeave(e)}
      onDragOver={(e) => onDragOver(e)}>
      <svg></svg>
    </div>
  );
};

export default SVGArea;
