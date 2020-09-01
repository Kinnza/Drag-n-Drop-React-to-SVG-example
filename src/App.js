import React, { useState } from "react";
import DraggableBlocks from "./DraggableBlocks";
import SVGArea from "./SVGArea";

import "./styles.css";

const App = () => {
  const [draggedData, setDragData] = useState(null);
  return (
    <div className="App">
      <DraggableBlocks setDragData={(dragData) => setDragData(dragData)} />
      <SVGArea draggedData={draggedData} />
    </div>
  );
};

export default App;
