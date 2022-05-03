import React, { useState, useCallback, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import axios from "axios";
import { Button, Fab } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import ShowLocation from "../ShowLocation";
import "../../../App.css";

const MapView = (props) => {
  const [pos, setPos] = useState();
  
  const [display, setDisplay] = useState(true);
  const [link, setLink] = useState(null);

  console.log(props);
  if (!link) {
    setLink(props.planLink);
  }

  const imageMap = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://54.164.240.76:8000/get_current_plan_position",
        {
          params: {
            image_id: props.imageId,
          },
        }
      );

      setPos(Object.keys(response.data)[0]);
    } catch (err) {
      console.error(err);
    }
  }, [props.imageId]);

  let mapData = {
    name: "myName",
    areas: [],
  };
  const { planId: image_id, co_ordinates } = props.planEmbed;
  const eids = Object.keys(co_ordinates);
  eids.map((key) => {
    let desc = {
      id: key,
      name: co_ordinates[key].coordinate_name,
      shape: "circle",
      coords: [co_ordinates[key].x, co_ordinates[key].y, 15],
      preFillColor: key === pos ? "#FF1818" : "#fff",
    };
    mapData.areas.push(desc);
  });

  useEffect(() => {
    imageMap();
  }, [imageMap]);

  const linkClickHandler = async (eid) => {
    try {
      const response = await axios.get(
        "http://54.164.240.76:8000/get_linking_image_plan",
        {
          params: {
            embedding_id: eid,
          },
        }
      );
      props.setIsComplete(false);
      props.setIsOk(false);
      props.setImageId(response.data.image_id);
    } catch (err) {
      console.error(err);
    }
  };

  const buttonSize = props.pWidth === 250 ? "small" : "medium";

  const displayPlusHandler = () => {
    if (props.pWidth === 250) {
      props.setPWidth(500);
    }
    if (!display) {
      setDisplay(true);
      props.setPWidth(250);
    }
  };

  const displayMinusHandler = () => {
    if (props.pWidth === 250) {
      setDisplay(false);
    }
    if (props.pWidth === 500) {
      props.setPWidth(250);
    }
  };

  return (
    <>
      <ShowLocation vid={props.vid} />
      <div className="info">
        {props.pWidth !== 500 && (
          <Fab
            size={buttonSize}
            color="primary"
            className="min-max-1"
            onClick={displayPlusHandler}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Fab>
        )}
        {display && (
          <Fab
            size={buttonSize}
            color="primary"
            className="min-max-2"
            onClick={displayMinusHandler}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Fab>
        )}
        {display && (
          <ImageMapper
            src={link}
            onClick={(event) => {
              linkClickHandler(event.id);
            }}
            map={mapData}
            imgWidth={500}
            width={props.pWidth}
            height={props.pWidth}
            onImageClick={() => props.setPWidth((prev) => (prev === 250 ? 500 : 250))}
          />
        )}
      </div>
    </>
  );
};

export default MapView;
