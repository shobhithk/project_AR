import React, { useState, useEffect, useCallback } from "react";
import TourPlannellum from "./TourPlannellum";
import axios from "axios";
import LoadingSpinner from "../UI/LoadingSpinner";

const Getlinks = (props) => {
  const [embedState, setEmbedState] = useState();
  const [linkState, setLinkState] = useState();
  const [imageState, setImageState] = useState();

  const [imageId, setImageId] = useState(Object.keys(props.imageData)[0]);
  const [isComplete, setIsComplete] = useState(false);
  const [isOk, setIsOk] = useState(false);

  const fetchLinkHandler = useCallback(async () => {
    try {
      const imgRes = localStorage.getItem(imageId);
      if (imgRes && window.innerWidth > 780) {
        console.log(window.innerWidth)
        console.log("inside desktop view,accessing local storage ");
        const result = JSON.parse(imgRes);
        const imgUrl = result.link;
        console.log("localstorage");
        setLinkState({ image_link: imgUrl });
        setIsOk(true);
      } else if (window.innerWidth > 780) {
        
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
  }, [imageId]);

  const fetchEmbedHandler = useCallback(async () => {
    try {
      const imgRes = localStorage.getItem(imageId);
      if (imgRes) {
        console.log("inside  embeddings accessing local storage ");
        console.log("fetch embedding");
        const result = JSON.parse(imgRes);
        const imgCord = result.data;
        console.log("localstorage");
        setEmbedState(imgCord);
      } else {
        console.log("inside embeddings,fetching");
        const response = await axios.get(
          "http://54.164.240.76:8000/get_embeddings",
          {
            params: { image_id: imageId },
          }
        );
        setEmbedState(response.data);
      }

      if (window.innerWidth <= 780) setIsComplete(false);
      else setIsComplete(true);
    } catch (error) {
      console.log(error.message);
    }
  }, [imageId]);

  const fetchImageHandler = useCallback(async () => {
    const imgRes = localStorage.getItem(imageId);
    try {
      console.log(window.innerWidth)
      if (imgRes && window.innerWidth <= 780) {
        console.log("inside mobile view,accessing local storage ");
        const result = JSON.parse(imgRes);
        const imgUrl = result.link;
        console.log("localstorage");
        console.log(imgUrl);
        setImageState(imgUrl);
        console.log("imageState has been set");
        if (window.innerWidth <= 780) setIsComplete(true);
        console.log("nhgvfjhgfjhg");
        setIsOk(true);
      } else if (window.innerWidth <= 780) {
        console.log("inside mobile view,fetching ");
        const response = await axios({
          method: "get",
          url: "http://54.164.240.76:8000/get_image_file1",
          responseType: "blob",
          params: { image_id: imageId,mobile_view: true },
        });

        console.log(response.data);
        const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
        setImageState(blobUrl);

        if (window.innerWidth < 780) setIsComplete(true);
        setIsOk(true);
      } else setImageState(null);
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
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Getlinks;
