import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PannellumLink from "./PannellumLink";

function FetchImageDetails() {
  const params = useParams();
  const paramsStr = params.vid_id;
  const [id, vid] = paramsStr.split("&");
  const [embedState, setEmbedState] = useState();
  const [linkState, setLinkState] = useState();

  const fetchLinkHandler = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://54.164.240.76:8000/get_image_link",
        {
          params: { image_id: id },
        }
      );
      setLinkState(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  const fetchEmbedHandler = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://54.164.240.76:8000/get_embeddings",
        {
          params: { image_id: id },
        }
      );

      setEmbedState(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  useEffect(() => {
    fetchLinkHandler();
    fetchEmbedHandler();
  }, [fetchLinkHandler, fetchEmbedHandler]);

  return (
    <>
      {embedState && linkState && (
        <PannellumLink imageData={linkState} embedData={embedState} vid={vid} />
      )}
    </>
  );
}

export default FetchImageDetails;
