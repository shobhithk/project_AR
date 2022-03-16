import React, { useState } from "react";

function ImageFunction() {
  const [imageState, setImagestate] = useState({ x: 0, y: 0 });

  const imageClickHandler = (event) => {
    setImagestate({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    });
  };

  return (
    <>
      <div>
        <img
          onClick={imageClickHandler}
          width="500"
          height="500"
          src="http://www.mariogiannini.com/wp-content/uploads/2017/10/Photo-200x300.jpg"
          alt="lake"
        />
      </div>
      <h1>
        {imageState.x} {imageState.y}
      </h1>
    </>
  );
}

export default ImageFunction;
