import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import PannellumImage from "./PannellumImage";
import { useParams } from "react-router-dom";


function ImageHandle() {
  const [linkState, setLinkState] = useState();
  const imageId = useParams()
 

  const fetchLinkHandler = useCallback(async () => {
    try {
      const response = await axios.get("http://54.164.240.76:8000/get_image_link",
      {
        params: { image_id: imageId.id },
      });
    

      setLinkState(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, [imageId]);

  useEffect(() => {

    fetchLinkHandler();
  }, [fetchLinkHandler])

  return (
    <>
      {linkState && <PannellumImage imageData={linkState} changeImage={setLinkState} />}
    </>
  );
}

export default ImageHandle;
