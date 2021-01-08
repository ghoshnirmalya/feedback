import { NextPage } from "next";
import React, { useState } from "react";

const IndexPage: NextPage = () => {
  const [annotation, setAnnotation] = useState({ x: 0, y: 0 });

  const handleClick = (e) => {
    // Calcualate co-ordinates in percentages in order to support responsive mode
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.x;
    const offsetY = e.clientY - rect.y;

    setAnnotation({
      x: (offsetX / rect.width) * 100,
      y: (offsetY / rect.height) * 100,
    });
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <img src="/images/demo.png" width="100%" />
      <div
        id="js-image"
        onClick={handleClick}
        style={{
          position: "absolute",
          inset: "0px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: `${annotation.y}%`,
            left: `${annotation.x}%`,
            width: "10px",
            height: "10px",
            backgroundColor: "red",
          }}
        />
      </div>
    </div>
  );
};

export default IndexPage;
