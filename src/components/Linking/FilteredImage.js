import React from "react";

function DisplayImageList(props) {
  const redirect = () => {
    props.setId(props.imageId);
  };

  return (
    <button
      className="btn btn-link"
      type="button"
      onClick={redirect}
    
    >
      {props.children}
    </button>
  );
}

export default DisplayImageList;
