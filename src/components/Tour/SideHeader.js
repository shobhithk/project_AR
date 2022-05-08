import React,{useState} from "react";
import { Button,ButtonGroup } from "@material-ui/core";
import {isMobile} from 'react-device-detect'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

const SideHeader = (props) => {

  const [display, setDisplay] = useState(false);
  const size=isMobile?'0.7em':'1em'

  const buttons = 
  Object.keys(props.images).map(function (key, index) {
    return key !== props.imageId ? (
   
        <Button
        key={index}
          type="button"
          className="but2"
          onClick={() => {
            props.setIsOk(false);
            props.setIsComplete(false);
            props.changeImage(key);
          }}
        >
          {props.images[key]}
        </Button>
     
    
    ) : (
      <Button className="none" key={index}></Button>
    );
  })

  const handleClick = () => {
   setDisplay((prev) => !prev);
  };


  return (
    <div className="sidenav">
       <Button
          className="but1"
          variant="contained"
          color="secondary"
          style={{ backgroundColor: "#22577E" }}
          onClick={handleClick}
        >
          Locations <FontAwesomeIcon icon={faCaretDown} />
        </Button>
        {display && (
        <ButtonGroup orientation="vertical">
          {buttons}
        </ButtonGroup>
      )}
    </div>
  );
};

export default SideHeader;
