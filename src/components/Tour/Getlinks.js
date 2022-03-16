import React, { useState, useEffect, useCallback } from "react";
import TourPlannellum from "./TourPlannellum";
import axios from "axios";


const Getlinks = (props) => {

  const [embedState, setEmbedState] = useState();
  const [linkState, setLinkState] = useState();
  const [imageId,setImageId] = useState(Object.keys(props.imageData)[0])
  const [isComplete,setIsComplete] = useState(true)

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
      setIsComplete(true)
    
    } catch (error) {
      console.log(error.message);
    }
  }, [imageId]);

  useEffect(() => {
    fetchLinkHandler();
    fetchEmbedHandler()
  }, [fetchLinkHandler,fetchEmbedHandler]);

  return (
    <>
      {embedState && linkState && (
        <TourPlannellum
          imageData={linkState}
          images={props.imageData}
          changeImage={setImageId}
          embedData = {embedState}
          isComplete = {isComplete}
          setIsComplete = {setIsComplete}
        />
      )}
    </>
  );
};

export default Getlinks;
