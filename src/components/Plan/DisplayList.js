import React from "react";
import { Button } from "@material-ui/core";

function DisplayList(props) {

  

  const redirect = () => {
    props.setIdState(props.imageId);
    console.log(props.imageId);
    console.log(props.eid)
  };

  return (
    <>
      <div>
        <Button variant="contained" onClick={redirect} style={{'width':'150px','margin':'10px'}}>{props.children}</Button>
      </div>
    </>
  );
}

export default DisplayList;
