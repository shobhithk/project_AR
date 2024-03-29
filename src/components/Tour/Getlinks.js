import React, { useState, useEffect, useCallback } from "react";
import TourPlannellum from "./TourPlannellum";
import axios from "axios";
import LoadingSpinner from "../UI/LoadingSpinner";
import { isMobile } from "react-device-detect";

const Getlinks = (props) => {
  const [embedState, setEmbedState] = useState();
  const [linkState, setLinkState] = useState();
  const [imageState, setImageState] = useState();

  const [imageId, setImageId] = useState(Object.keys(props.imageData)[0]);
  const [isComplete, setIsComplete] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [exists, setExists] = useState(false);

  function checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };

      img.onerror = () => {
        callback(false);
      };
    }
  }

  const fetchLinkHandler = useCallback(async () => {
    try {
      const imgRes = localStorage.getItem(imageId);
      if (imgRes) {
        const result = JSON.parse(imgRes);
        const imgUrl = result.link;

        checkIfImageExists(imgUrl, (exists) => {
          if (exists) {
            setExists(true);
          } else {
            setExists(false);
          }
        });
      }
      if (imgRes && !isMobile && exists) {
        const result = JSON.parse(imgRes);
        const imgUrl = result.link;
        setLinkState({ image_link: imgUrl });
        setIsOk(true);
      } else if (!isMobile) {
        console.log("inside desktop view fetching image link");
        const response = await axios.get(
          "http://54.164.240.76:8000/get_image_link",
          {
            params: { image_id: imageId },
          }
        );
        setLinkState(response.data);
        setIsOk(true);
      } else {
        setLinkState(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [imageId, exists]);

  const fetchEmbedHandler = useCallback(async () => {
    try {
      const imgRes = localStorage.getItem(imageId);
      if (imgRes) {
        const result = JSON.parse(imgRes);
        const imgCord = result.data;

        setEmbedState(imgCord);
      } else {
        const response = await axios.get(
          "http://54.164.240.76:8000/get_embeddings",
          {
            params: { image_id: imageId },
          }
        );
        setEmbedState(response.data);
      }

      if (isMobile) setIsComplete(false);
      else setIsComplete(true);
    } catch (error) {
      console.log(error.message);
    }
  }, [imageId]);

  const fetchImageHandler = useCallback(async () => {
    const imgRes = localStorage.getItem(imageId);
    if (imgRes) {
      const result = JSON.parse(imgRes);
      const imgUrl = result.link;

      checkIfImageExists(imgUrl, (exists) => {
        if (exists) {
          setExists(true);
        } else {
          setExists(false);
        }
      });
    }
    try {
      if (imgRes && isMobile && exists) {
        const result = JSON.parse(imgRes);
        const imgUrl = result.link;
        setImageState(imgUrl);
        if (isMobile) setIsComplete(true);
        setIsOk(true);
      } else if (isMobile) {
        const response = await axios({
          method: "get",
          url: "http://54.164.240.76:8000/get_image_file1",
          responseType: "blob",
          params: { image_id: imageId, mobile_view: true },
        });

        console.log(response.data);
        const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
        setImageState(blobUrl);

        if (isMobile) setIsComplete(true);
        setIsOk(true);
      } else setImageState(null);
    } catch (error) {
      console.log(error.message);
    }
  }, [imageId,exists]);

  useEffect(() => {
    fetchEmbedHandler();

    fetchImageHandler();

    fetchLinkHandler();
  }, [fetchLinkHandler, fetchEmbedHandler, fetchImageHandler]);

  return (
    <>
      {embedState && (linkState || imageState) && isOk ? (
        <TourPlannellum
          imageData={linkState}
          images={props.imageData}
          changeImage={setImageId}
          embedData={embedState}
          isComplete={isComplete}
          setIsComplete={setIsComplete}
          mobileImage={imageState}
          isOk={isOk}
          setIsOk={setIsOk}
          imageId={imageId}
          vid={props.vid}
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Getlinks;
