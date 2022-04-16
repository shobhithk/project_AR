import React, { useState, useCallback, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import InputPlan from "./InputPlan";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Grid } from "@material-ui/core";

export default function InitPlan() {
  const params = useParams();
  const history = useHistory();

  const [linkState, setLinkState] = useState();
  const [isTrue, setIsTrue] = useState(true);
  const [xCord, setXCord] = useState();
  const [yCord, setYCord] = useState();
  const [checkAreas, setCheckAreas] = useState();
  const [temp, setTemp] = useState({
    areas: [],
  });
  const [mapAreas, setMapAreas] = useState({
    name: "my-map",
    areas: [],
  });

  const getTipPosition = (area) => {
    const obj = { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
    console.log(obj);
  };

  const fetchLinkHandler = useCallback(async () => {
    try {
      setIsTrue(false);
      const response = await axios.get(
        "http://54.164.240.76:8000/get_plan_link",
        {
          params: { virtual_tour_id: params.vid },
        }
      );

      setLinkState(response.data);
      setIsTrue(true);
    } catch (error) {
      console.log(error.message);
    }
  }, [params.vid]);

  const updateMapArea = useCallback(
    (coords) => {
      setTemp((map) => ({
        areas: [
          ...mapAreas.areas,
          { shape: "circle", coords: coords, preFillColor: "#000" },
        ],
      }));
    },
    [mapAreas]
  );

  const handleUpdateMapArea = useCallback(
    (evt) => {
      setCheckAreas(false);
      setXCord(evt.nativeEvent.layerX);
      setYCord(evt.nativeEvent.layerY);
      updateMapArea([evt.nativeEvent.layerX, evt.nativeEvent.layerY, 10]);
    },
    [updateMapArea]
  );

  useEffect(() => {
    fetchLinkHandler();
  }, [fetchLinkHandler]);

  const submitHandler = useCallback(async () => {
    let cords = {};
    mapAreas.areas.map((obj) => {
      cords = {
        ...cords,
        [obj.name[0]]: { x: obj.coords[0], y: obj.coords[1] },
      };
    });

    const data = {
      plan_id: linkState.plan_id,
      co_ordinates: cords,
    };
    console.log(data);
    try {
      const response = await axios.post(
        "http://54.164.240.76:8000/send_embeddings_plan",
        data
      );
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }, [linkState, mapAreas, history]);

  return isTrue ? (
    <Grid container spacing={2}>
      {linkState && (
        <Grid item xs={8}>
          <ImageMapper
            src={linkState.plan_link}
            onClick={(area) => getTipPosition(area)}
            onImageClick={handleUpdateMapArea}
            map={checkAreas ? mapAreas : temp}
            width={500}
            imgWidth={500}
          />
        </Grid>
      )}
      <Grid item xs={4}>
        <InputPlan
          setMapAreas={setMapAreas}
          cords={{ x: xCord, y: yCord }}
          setCheckAreas={setCheckAreas}
        />
        <button className="btn btn-success" onClick={submitHandler}>
          Submit
        </button>
      </Grid>
    </Grid>
  ) : (
    <LoadingSpinner />
  );
}
