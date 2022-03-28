import React, { useState, useCallback, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DisplayList from "./DisplayList";

const LinkImage = (props) => {
  const [images, setImages] = useState();
  const [eid, setEid] = useState();
  const [idState, setIdState] = useState();
  const [alertState, setAlertState] = useState(false);
  const [width,setWidth] = useState(500)
 

  let mapData = {
    name: "myName",
    areas: [],
  };
  const { planId: image_id, co_ordinates } = props.embedState;
  const eids = Object.keys(co_ordinates);
  eids.map((key) => {
    let desc = {
      id: key,
      name: co_ordinates[key].coordinate_name,
      shape: "circle",
      coords: [co_ordinates[key].x, co_ordinates[key].y, 10],
      preFillColor: "#fff",
    };
    mapData.areas.push(desc);
  });

  const fetchImageHandler = useCallback(async () => {
    try {
      const response = await axios.get("http://54.164.240.76:8000/get_images", {
        params: { virtual_tour_id: props.vid },
      });
      setImages(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, [props.vid]);

  useEffect(() => {
    fetchImageHandler();
  }, [fetchImageHandler]);

  const linkClickHandler = (eid) => {
    setEid(eid);
  };

  const submitHandler = async () => {
    try {
      console.log(eid, idState);
      if (!idState || !eid) return;
      const response = await axios.post(
        "http://54.164.240.76:8000/create_links_plan",
        null,
        {
          params: {
            image_id: idState,
            embedding_id: eid,
          },
        }
      );
      setEid(null);
      setIdState(null);
      console.log(response);
      if (response.status === 200) {
        setAlertState(true)
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {images && (
        <>
        {alertState && <Alert
            action={
              <Button color="inherit" size="small" onClick={()=>{setAlertState(false)}}>
                close
              </Button>
            }
          >Succesfully Linked!
          </Alert>}
          <Grid container spacing={2}>
            <Grid item xs={8}>
              {console.log(mapData)}
              <ImageMapper
                src={props.linkState.plan_link}
                onClick={(event) => {
                  linkClickHandler(event.id);
                }}
                map={mapData}
                imgWidth={500}
                width={500}
                height={500}
              />
            </Grid>
            <Grid item xs={4}>
              {Object.keys(images).map((key, index) => (
                <DisplayList
                  key={index}
                  imageId={key}
                  eid={eid}
                  setIdState={setIdState}
                >
                  {images[key]}
                </DisplayList>
              ))}
              <Button
                variant="contained"
                color="secondary"
                onClick={submitHandler}
                style={{ margin: "3.5em" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default LinkImage;
