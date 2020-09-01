import React, { useEffect } from "react";
import * as d3 from "d3";

import SVGDrawer from "./SVGDrawer";

const nodes = [];

/**
 * Convert DOM coordinates to SVG coordinates based on SVG offset and zoom level
 */
const convertCoordinatesDOMtoSVG = (svg, x, y) => {
  const pt = svg.node().createSVGPoint();

  pt.x = x;
  pt.y = y;
  return pt.matrixTransform(svg.node().getScreenCTM().inverse());
};

const SVGArea = ({ draggedData }) => {
  useEffect(() => {
    SVGDrawer.draw(nodes);
  }, []);

  const onDragOver = (e) => {
    e.preventDefault();
    d3.select("svg").classed("drag-over", true);
  };

  const onDragLeave = () => {
    d3.select("svg").classed("drag-over", false);
  };

  const onDrop = (e) => {
    e.stopPropagation();
    d3.select("svg").classed("drag-over", false);

    // Get the correct coordinates for this node
    const { x, y } = convertCoordinatesDOMtoSVG(
      d3.select("svg"),
      e.clientX - draggedData.offset[0],
      e.clientY - draggedData.offset[1]
    );

    // Add the node to the list of nodes.
    nodes.push({
      id: nodes.length + 1,
      name: draggedData.dragObject.name,
      color: draggedData.dragObject.color,
      x,
      y
    });

    // Redraw the nodes
    SVGDrawer.draw(nodes);

    return false;
  };

  return (
    <div
      className="svgContainer"
      onDrop={(e) => onDrop(e)}
      onDragLeave={(e) => onDragLeave(e)}
      onDragOver={(e) => onDragOver(e)}
    >
      <svg></svg>
    </div>
  );
};

export default SVGArea;
