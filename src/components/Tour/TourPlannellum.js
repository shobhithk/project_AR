import React, { useRef } from "react";
import { Pannellum } from "pannellum-react";
import axios from "axios";
import SideHeader from "./SideHeader";
import LoadingSpinner from "../UI/LoadingSpinner";

const TourPlannellum = (props) => {
  const blobUrl = window.URL.createObjectURL(new Blob([props.mobileImage]));
  console.log(blobUrl)

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

  return props.isOk? (
    <>
      <SideHeader
        images={props.images}
        imageData={props.imageData}
        changeImage={props.changeImage}
      />
      {props.isComplete && (
        <Pannellum
          ref={panImage}
          width="100%"
          height="94.7vh"
          image={window.innerWidth < 780 ? blobUrl : props.imageData.image_link} //imageResult ? imageResult : props.imageData.image_link
          pitch={10}
          yaw={180}
          hfov={500}
          autoLoad
          draggable
          keyboardZoom
          mouseZoom
          orientationOnByDefault={false}
          showZoomCtrl={false}
        >
          {coArray.map(function (key, index) {
            counts[key] = counts[key] + 1;
            return (
              <Pannellum.Hotspot
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
                    props.setIsOk(false)
                    props.changeImage(response.data.image_id);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                handleClickArg={{ name: { key } }}
              />
            );
          })}
        </Pannellum>
      )}
    </>
  ) : (
    <LoadingSpinner />
  );
};

export default TourPlannellum;
