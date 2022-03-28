import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import MapView from "./MapView";
import LoadingSpinner from "../../UI/LoadingSpinner";

const GetMapData = (props) => {
  const [isTrue, setIsTrue] = useState();
  const [linkState, setLinkState] = useState();
  const [embedState, setEmbedState] = useState();

  const fetchLinkHandler = useCallback(async () => {
    try {
      setIsTrue(false);
      const response = await axios.get(
        "http://54.164.240.76:8000/get_plan_link",
        {
          params: { virtual_tour_id: props.vid },
        }
      );
      const response2 = await axios.get(
        "http://54.164.240.76:8000/get_plan_embeddings",
        {
          params: { plan_id: response.data.plan_id },
        }
      );
      setEmbedState(response2.data);
      setLinkState(response.data);
      setIsTrue(true);
    } catch (error) {
      console.log(error.message);
    }
  }, [props.vid]);

  useEffect(() => {
    fetchLinkHandler();
  }, [fetchLinkHandler]);

  return (
    <>
      {isTrue ? (
        linkState &&
        embedState && (
          <MapView
            planLink={linkState}
            planEmbed={embedState}
            vid={props.vid}
            imageId={props.imageId}
            setImageId={props.changeImage}
            setIsOk={props.setIsOk}
            setIsComplete={props.setIsComplete}
          />
        )
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default GetMapData;
