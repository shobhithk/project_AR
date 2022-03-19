import React from "react";

const SideHeader = (props) => {
  return (
    <div className="sidenav">
      {Object.keys(props.images).map(function (key, index) {
        return key != props.imageId ? (
          <>
            <button
              type="button"
              key={index}
              className="btn btn-link"
              onClick={() => {
                props.changeImage(key);
                props.setIsOk(false);
                props.setIsComplete(false);
              }}
            >
              {props.images[key]}
            </button>
            <hr className="hr" />
          </>
        ) : (
          <div className="none" key={index}></div>
        );
      })}
    </div>
  );
};

export default SideHeader;
