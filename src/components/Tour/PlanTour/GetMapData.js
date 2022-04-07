import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import MapView from "./MapView";
import { isMobile } from "react-device-detect";
import MobileMap from "./MobileMap";
import LoadingSpinner from "../../UI/LoadingSpinner";

const GetMapData = (props) => {
  const [isTrue, setIsTrue] = useState(true);
  const [linkState, setLinkState] = useState();
  const [embedState, setEmbedState] = useState();

  const fetchLinkHandler = useCallback(async () => {
    try {
      // setIsTrue(false);
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

      // const response3 = await axios({
      //   method: "get",
      //   url: "http://54.164.240.76:8000/get_plan_file",
      //   responseType: "blob",
      //   params: { virtual_tour_id: props.vid },
      // });
      // const blobUrl = window.URL.createObjectURL(new Blob([response3.data]));
      // setLinkState(blobUrl);

      setEmbedState(response2.data);
      // setIsTrue(true);
    } catch (error) {
      console.log(error.message);
    }
  }, [props.vid]);


  const fetchFileHandler = useCallback(async () => {
    try {
      // setIsTrue(false);

      const response3 = await axios({
        method: "get",
        url: "http://54.164.240.76:8000/get_plan_file",
        responseType: "blob",
        params: { virtual_tour_id: props.vid },
      });
      const blobUrl = window.URL.createObjectURL(new Blob([response3.data]));
      setLinkState(blobUrl);

      // setIsTrue(true);
    } catch (error) {
      console.log(error.message);
    }
  }, [props.vid]);

  // useEffect(() => {
  //   fetchLinkHandler();
  // }, [fetchLinkHandler]);

  useEffect(()=>{
    fetchFileHandler()
    fetchLinkHandler();
  },[])

  return (
    <>
      {isTrue ? (
        !isMobile ? (
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
          linkState &&
          embedState && (
            <MobileMap
              planLink={linkState}
              planEmbed={embedState}
              vid={props.vid}
              imageId={props.imageId}
              setImageId={props.changeImage}
              setIsOk={props.setIsOk}
              setIsComplete={props.setIsComplete}
            />
          )
        )
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default GetMapData;
