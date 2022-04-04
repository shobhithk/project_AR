import React, { useState, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import styles from "./ShowLocation.module.css";

const ShowLocation = (props) => {
  const [location, setLocation] = useState();

  const mapIcon = useCallback(async () => {
    try {
      console.log("logo");
      const response = await axios.get(
        "http://54.164.240.76:8000/get_plan_location",
        {
          params: {
            tour_id: props.vid,
          },
        }
      );
      console.log(response.data);
      setLocation(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [props.vid]);

  useEffect(() => {
    mapIcon();
  }, [mapIcon]);

  return (
    <>
      {location && (
        <div className={styles.location}>
          <a href={location} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faMapMarker} style={{color:"crimson"}} />
          </a>
        </div>
      )}
    </>
  );
};

export default ShowLocation;
