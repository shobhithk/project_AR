import React from "react";

const SideHeader = (props) => {
  return (
    <div className="sidenav">
      {Object.keys(props.images).map(function (key, index) {
        return key != props.imageData.image_id ? (
          <button
            type="button"
            key={index}
            className="btn btn-link"
            onClick={() => props.changeImage(key)}
          >
            {props.images[key]}
          </button>
        ) : (
          <div className="none" key={index}></div>
        );
      })}
    </div>
  );
};

export default SideHeader;
