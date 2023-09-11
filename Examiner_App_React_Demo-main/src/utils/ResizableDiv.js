import React, { useState } from "react";

const ResizableDiv = ({ initialWidth }) => {
  const [width, setWidth] = useState(initialWidth);

  const handleResize = (e) => {
    const newWidth = `${(e.clientX / window.innerWidth) * 100}%`;
    setWidth(newWidth);
  };

  return (
    <div
      className="resizable"
      style={{ width }}
      onMouseDown={(e) => {
        document.addEventListener("mousemove", handleResize);
        document.addEventListener("mouseup", () => {
          document.removeEventListener("mousemove", handleResize);
        });
      }}
    >
      {/* Content goes here */}
    </div>
  );
};

export default ResizableDiv;
