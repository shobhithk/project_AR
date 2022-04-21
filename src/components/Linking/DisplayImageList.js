import React from "react";
import { useHistory } from "react-router-dom";

function DisplayImageList(props) {
  const history = useHistory();

  const redirect = () => {
    if (!props.mark) history.push(`/link/${props.imageId}&${props.vid}`);
    else history.push(`/mark/${props.imageId}`);
  };

  return (
    <>
      <div className="d-grid gap-2 col-6 mx-auto" style={{"fontSize":"20px"}}>
        <button
          className="btn btn-outline-dark btl-lg"
          type="button"
          onClick={redirect}
          style={{ "margin": "10px" }}
        >
          {props.children}
        </button>
      </div>
    </>
  );
}

export default DisplayImageList;
