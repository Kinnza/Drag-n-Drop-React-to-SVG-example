import React, { useState } from "react";
import DraggableBlocks from "./DraggableBlocks";
import SVGArea from "./SVGArea";

import SVGDrawer from "./SVGDrawer";

import "./styles.css";

const App = () => {
  const [draggedData, setDragData] = useState(null);
  const [nodes, setNodes] = useState ([]);

  const onAddNode = (dropX,dropY)=>{
      // Get the correct coordinates for this node
      const { x , y } = SVGDrawer.convertCoordinatesDOMtoSVG(
          dropX - draggedData.offset[0],
          dropY - draggedData.offset[1]
      );

      let newNodes = [...nodes,{
          id: nodes.length + 1,
          name: draggedData.dragObject.name,
          color: draggedData.dragObject.color,
          x,
          y
      }];

      setNodes(newNodes);
  };

  return (
    <div className="App">
      <DraggableBlocks setDragData={(dragData) => setDragData(dragData)} onAddNode={onAddNode} />
      <SVGArea nodes={nodes} onAddNode={onAddNode}/>
    </div>
  );
};

export default App;
