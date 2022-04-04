import React, { useState } from "react";
import styles from "./ShowAmenities.module.css";
import { Button, ButtonGroup } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import {isMobile} from 'react-device-detect'


const ShowAmenities = (props) => {
  const [display, setDisplay] = useState(false);
  const [displayNext, setDisplayNext] = useState(false);
  const [dropData, setDropData] = useState();
  const [depth, setDepth] = useState(0);

  const size=isMobile?'0.7em':'1em'

  const nextButton = dropData
    ? Object.keys(props.data[dropData]).map((key2, index) => {
        return (
          <Button
            key={index}
            variant="contained"
            style={{ backgroundColor: "#74959A","fontSize":`${size}`}}
          >
            <div>
              <a
                href={props.data[dropData][key2].location_link}
                rel="noreferrer"
                target="_blank"
              >
                {key2}
              </a>
              <p>
                <span style={{ marginRight: "10px" }}>
                  {props.data[dropData][key2].distance}
                </span>
                <span style={{ marginLeft: "10px" }}>
                  {props.data[dropData][key2].time}
                </span>
              </p>
            </div>
          </Button>
        );
      })
    : [];

  const buttons = Object.keys(props.data).map((k, index) => {
    return (
      <Button
        key={index}
        variant="contained"
        style={{ backgroundColor: "#8FBDD3","fontSize":`${size}`}}
        onClick={(key) => {
          setDropData(k);
          setDepth(index);
          setDisplayNext((prev) => !prev);
        }}
      >
        {k} <FontAwesomeIcon icon={faCaretRight} style={{ margin: "3px" }} />
      </Button>
    );
  });

  const handleClick = () => {
    console.log("clicked");
    setDisplay((prev) => !prev);
  };

  

  return (
    <>
      <div className={styles.area}>
        <Button
          variant="contained"
          color="secondary"
          style={{ backgroundColor: "#22577E", height: "2em","fontSize":`${size}` }}
          onClick={handleClick}
        >
          amenities <FontAwesomeIcon icon={faCaretDown} />
        </Button>
      </div>
      {display && (
        <ButtonGroup orientation="vertical" className={styles.grp}>
          {buttons}
        </ButtonGroup>
      )}
      {displayNext && display && dropData && (
        <ButtonGroup
          orientation="vertical"
          className={styles.grp2}
          style={isMobile?{ top: `${depth * 1.7 +10}em`}:{top: `${depth * 2.4 + 6}em`}}
        >
          {nextButton}
        </ButtonGroup>
      )}
    </>
  );
};

export default ShowAmenities;
