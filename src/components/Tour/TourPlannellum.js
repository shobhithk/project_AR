import React, { useState, useRef, useEffect, useCallback } from "react";
import { Pannellum } from "pannellum-react";
import axios from "axios";
import SideHeader from "./SideHeader";
import pano from '../../Assets/Images/pano.jpg'

const TourPlannellum = (props) => {
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);

  const panImage = useRef(null);
  const co_ordinates = props.embedData.co_ordinates;

  const coArray = Object.keys(co_ordinates);

  const counts = {};
  coArray.map((key, index) => {
    coArray.push(key);
  });
  for (const num of coArray) {
    counts[num] = 0;
  }

  

  return (
    <>
      <SideHeader
        images={props.images}
        imageData={props.imageData}
        changeImage={props.changeImage}
      />
      {props.isComplete && <Pannellum
        ref={panImage}
        width="100%"
        height="95.5vh"
        image={props.imageData.image_link}
        pitch={10}
        yaw={180}
        hfov={500}
        maxPitch={70}
        minPitch={-70}
        autoLoad
        draggable
        keyboardZoom
        mouseZoom
        orientationOnByDefault={false}
        showZoomCtrl={false}
        onMouseup={(event) => {
          setPitch(panImage.current.getViewer().mouseEventToCoords(event)[0]);
          setYaw(panImage.current.getViewer().mouseEventToCoords(event)[1]);
        }}
      >
        {coArray.map(function (key, index) {
          counts[key] = counts[key] + 1;
          return (
         
            < Pannellum.Hotspot
              key={index}
              type={counts[key] === 1 ? "custom" : "info"}
              pitch={
                counts[key] === 1
                  ? +co_ordinates[key].y
                  : +co_ordinates[key].y + 7
              }
              yaw={
                counts[key] === 1
                  ? +co_ordinates[key].x
                  : +co_ordinates[key].x + 7
              }
              text={co_ordinates[key].coordinate_name}
              handleClick={async (evt, args) => {
                try {
                
                  const response = await axios.get(
                    "http://54.164.240.76:8000/get_linking_image",
                    {
                      params: {
                        embedding_id: key,
                      },
                    }
                  );
                  props.setIsComplete(false);
                  props.changeImage(response.data.image_id);
                } catch (err) {
                  console.error(err);
                }
              }}
              handleClickArg={{ name: { key } }}
            />
          );
        })}
      </Pannellum>}
    </>
  );
};

export default TourPlannellum;
