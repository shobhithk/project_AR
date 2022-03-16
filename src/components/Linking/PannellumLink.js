import { Pannellum } from "pannellum-react";
import React, { useState, useRef } from "react";
import ListImages from "./ListImages";
import axios from "axios";
import { useHistory } from "react-router-dom";

function PannellumLink(props) {
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [id, setId] = useState();
  const [eid, setEid] = useState();

  const panImage = useRef(null);
  const co_ordinates = props.embedData.co_ordinates;
  const history = useHistory();

  const rollBack = () => {
    history.push("/link");
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://54.164.240.76:8000/create_links",
        null,
        {
          params: {
            image_id: id,
            embedding_id: eid,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        className="btn btn-primary"
        style={{ margin: "10px" }}
        onClick={rollBack}
      >
        Back
      </button>
      <button type="button" className="btn btn-success" onClick={handleSubmit}>
        Submit
      </button>
      <Pannellum
        ref={panImage}
        width="100%"
        height="84.5vh"
        image={props.imageData.image_link}
        pitch={10}
        yaw={180}
        hfov={500}
        maxPitch={70}
        minPitch={-70}
        autoLoad
        draggable
        keyboardZoom
        mouseZoom
        orientationOnByDefault={false}
        showZoomCtrl={false}
        onMouseup={(event) => {
          setPitch(panImage.current.getViewer().mouseEventToCoords(event)[0]);
          setYaw(panImage.current.getViewer().mouseEventToCoords(event)[1]);
        }}
      >
        {Object.keys(co_ordinates).map(function (key, index) {
          return (
            <Pannellum.Hotspot
              key={index}
              type="custom"
              pitch={+co_ordinates[key].y}
              yaw={+co_ordinates[key].x}
              handleClick={(evt, args) => setEid(key)}
              handleClickArg={{ name: { key } }}
            />
          );
        })}
      </Pannellum>
      <ListImages imageId={props.imageData.image_id} setId={setId} />
    </>
  );
}

export default PannellumLink;
