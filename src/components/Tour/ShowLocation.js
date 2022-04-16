import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import styles from "./ShowLocation.module.css";
import { Button } from "@material-ui/core";

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
          <Button variant="contained" color="secondary">
            <a
              href={location}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Take me!
              <i className="fa-solid fa-map-location"></i>
            </a>
          </Button>
        </div>
      )}
    </>
  );
};

export default ShowLocation;
