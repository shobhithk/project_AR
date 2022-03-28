import React, { useRef, useEffect, useCallback } from "react";
import { Pannellum } from "pannellum-react";
import axios from "axios";
import SideHeader from "./SideHeader";
import styles from "./TourPlannellum.module.css";
import GetMapData from "./PlanTour/GetMapData";

const TourPlannellum = (props) => {
  const panImage = useRef(null);
  const co_ordinates = props.embedData.co_ordinates;

  const coArray = Object.keys(co_ordinates);
  const allKeys = Object.keys(co_ordinates);

  const counts = {};

  coArray.map((key, index) => {
    coArray.push(key);
  });
  for (const num of coArray) {
    counts[num] = 0;
  }

  const getLinkingImages = useCallback(async (embedId) => {
    const response = await axios.get(
      "http://54.164.240.76:8000/get_linking_image",
      {
        params: {
          embedding_id: embedId,
        },
      }
    );
    const response2 = await axios({
      method: "get",
      url: "http://54.164.240.76:8000/get_image_file1",
      responseType: "blob",
      params: {
        image_id: response.data.image_id,
        mobile_view: window.innerWidth < 780 ? true : false,
      },
    });

    const response3 = await axios.get(
      "http://54.164.240.76:8000/get_embeddings",
      {
        params: { image_id: response.data.image_id },
      }
    );
    console.log("fetched" + response.data.image_id);
    return {
      link: window.URL.createObjectURL(new Blob([response2.data])),
      data: response3.data,
      imageId: response.data.image_id,
    };
  }, []);

  useEffect(() => {
    allKeys.map((element) => {
      const nextImages = async (key) => {
        const url = localStorage.getItem(key);
        if (!url) {
          let a = await getLinkingImages(element);
          let b = { link: a.link, data: a.data };
          b = JSON.stringify(b);
          localStorage.setItem(a.imageId, b);
          console.log("this is imageFile");
        }
      };
      nextImages(element);
    });
  }, []);

  return (
    <>
      <GetMapData
        vid={props.vid}
        imageId={props.imageId}
        changeImage={props.changeImage}
        setIsOk={props.setIsOk}
        setIsComplete={props.setIsComplete}
      />
      <SideHeader
        setIsOk={props.setIsOk}
        setIsComplete={props.setIsComplete}
        images={props.images}
        imageId={props.imageId}
        changeImage={props.changeImage}
      />
      {props.isComplete && (
        <Pannellum
          ref={panImage}
          width="100%"
          height="94.7vh"
          image={
            window.innerWidth < 780
              ? props.mobileImage
              : props.imageData.image_link
          } //imageResult ? imageResult : props.imageData.image_link
          pitch={10}
          yaw={180}
          hfov={window.innerWidth < 780 ? 100 : 100}
          autoLoad
          draggable
          cssClass={styles["custom-hotspot"]}
          keyboardZoom
          mouseZoom
          orientationOnByDefault={false}
          showZoomCtrl={false}
          compass={true}
          autoRotate={1}
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
                    : +co_ordinates[key].y + 3
                }
                yaw={
                  counts[key] === 1
                    ? +co_ordinates[key].x
                    : +co_ordinates[key].x + 3
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
                    props.setIsOk(false);

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
  );
};

export default TourPlannellum;
