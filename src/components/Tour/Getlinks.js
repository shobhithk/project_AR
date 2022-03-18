import React, { useState, useEffect, useCallback } from "react";
import TourPlannellum from "./TourPlannellum";
import axios from "axios";

const Getlinks = (props) => {
  const [embedState, setEmbedState] = useState();
  const [linkState, setLinkState] = useState();
  const [imageState, setImageState] = useState();
  const [imageId, setImageId] = useState(Object.keys(props.imageData)[0]);
  const [isComplete, setIsComplete] = useState(true);
  const [isOk, setIsOk] = useState(false);

  const fetchLinkHandler = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://54.164.240.76:8000/get_image_link",
        {
          params: { image_id: imageId },
        }
      );
      setLinkState(response.data);
     
    } catch (error) {
      console.log(error.message);
    }
  }, [imageId]);

  const fetchEmbedHandler = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://54.164.240.76:8000/get_embeddings",
        {
          params: { image_id: imageId },
        }
      );

      setEmbedState(response.data);
      if (window.innerWidth < 780) setIsComplete(false);
      else setIsComplete(true);
    } catch (error) {
      console.log(error.message);
    }
  }, [imageId]);

  const fetchImageHandler = useCallback(async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://54.164.240.76:8000/get_image_file",
        responseType: "blob",
        params: { image_id: imageId },
      });

      console.log(response.data);
      setImageState(response.data);
      if(window.innerWidth<780)
        setIsComplete(true)
      setIsOk(true);
    } catch (error) {
      console.log(error.message);
    }
  }, [imageId]);

  useEffect(() => {
    fetchEmbedHandler();

    fetchImageHandler();

    fetchLinkHandler();
  }, [fetchLinkHandler, fetchEmbedHandler, fetchImageHandler]);

  return (
    <>
      {embedState && linkState && imageState && (
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
        />
      )}
    </>
  );
};

export default Getlinks;
