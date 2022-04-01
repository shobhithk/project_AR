import React, { useState, useCallback, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import axios from "axios";
import { Button, Fab } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import "../../../App.css";

const MapView = (props) => {
  const [pos, setPos] = useState();
  const [pWidth, setPWidth] = useState(250);
  const [display, setDisplay] = useState(true);
  const [link,setLink] = useState(null)

  console.log(props);
  if(!link){
    setLink(props.planLink.plan_link)
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
      coords: [co_ordinates[key].x, co_ordinates[key].y, 10],
      preFillColor: key === pos ? "#FFD93D" : "#fff",
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

  const buttonSize = (pWidth === 250) ? "small" : "medium";

  const displayPlusHandler = () => {
    if (pWidth === 250) {
      setPWidth(500);
    }
    if (!display) {
      setDisplay(true);
      setPWidth(250);
    }
  };

  const displayMinusHandler = () => {
    if (pWidth === 250) {
      setDisplay(false);
    }
    if (pWidth === 500) {
      setPWidth(250);
    }
  };

  return (
    <>
      <div className="info">
        {pWidth!==500 &&  <Fab
          size={buttonSize}
          color="primary"
          className="min-max-1"
          onClick={displayPlusHandler}
        >
         
          <FontAwesomeIcon icon={faPlus} />
        </Fab>}
        {display && <Fab
          size={buttonSize}
          color="primary"
          className="min-max-2"
          onClick={displayMinusHandler}
        >
          <FontAwesomeIcon icon={faMinus} />
        </Fab>}
        {pos && display && (
          <ImageMapper
            src={link}
            onClick={(event) => {
              linkClickHandler(event.id);
            }}
            map={mapData}
            imgWidth={500}
            width={pWidth}
            height={pWidth}
            onImageClick={() => setPWidth((prev) => (prev === 250 ? 500 : 250))}
          />
        )}
      </div>
    </>
  );
};

export default MapView;
