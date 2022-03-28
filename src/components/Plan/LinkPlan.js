import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LinkImage from "./LinkImage";
import LoadingSpinner from ".././UI/LoadingSpinner";

const LinkPlan = () => {
  const params = useParams();
  const [isTrue, setIsTrue] = useState();
  const [linkState, setLinkState] = useState();
  const [embedState, setEmbedState] = useState();
  const [planEmbed, setPlanEmbed] = useState(true);

  const fetchLinkHandler = useCallback(async () => {
    try {
      setIsTrue(false);
      const response = await axios.get(
        "http://54.164.240.76:8000/get_plan_link",
        {
          params: { virtual_tour_id: params.vid },
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
      setPlanEmbed(true)
      setIsTrue(true);
    } catch (error) {
      console.log(error.message);
    }
  }, [params.vid]);

  useEffect(() => {
    fetchLinkHandler();
  }, [fetchLinkHandler]);

  return (
    <>
      {isTrue ? (
        linkState &&
        embedState && (
          <LinkImage
            linkState={linkState}
            embedState={embedState}
            setPlanEmbed={setPlanEmbed}
            planEmbed={planEmbed}
            vid={params.vid}
          />
        )
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default LinkPlan;
