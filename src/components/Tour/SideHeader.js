import React from "react";

const SideHeader = (props) => {
  return (
    <div className="sidenav">
      {Object.keys(props.images).map(function (key, index) {
        return key !== props.imageId ? (
          <React.Fragment key={index}>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => {
                props.setIsOk(false);
                props.setIsComplete(false);
                props.changeImage(key);
              }}
            >
              {props.images[key]}
            </button>
         
          </React.Fragment>
        ) : (
          <div className="none" key={index}></div>
        );
      })}
    </div>
  );
};

export default SideHeader;
