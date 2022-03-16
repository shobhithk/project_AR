import axios from "axios";
import { Pannellum } from "pannellum-react";
import React, { useState, useRef } from "react";
import InputName from "./InputName";
import styles from "./PannellumImage.module.css";
import { useHistory } from "react-router-dom";
import '../index.css'

const PannellumImage = (props) => {
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [cordObj, setCordObj] = useState({ cords: {} });
  const [name, setName] = useState([""]);
  const [edit, setEdit] = useState(false);

  const history = useHistory()

  const panImage = useRef(null);
  const buttonPrimary = `btn btn-primary ${styles.bton}`;
  const buttonSecondary = `btn btn-secondary ${styles.bton}`;
  const buttonSuccess = `btn btn-success ${styles.bton}`;

  const handleCancel = () => {
    setCordObj({ cords: {} });
  };

  const backRoll = ()=>{
    history.push('/link')
  }

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleSubmit = async () => {
    const data = {
      image_id: props.imageData.image_id,
      co_ordinates: cordObj.cords,
    };
    try {
      const response = await axios.post(
        "http://54.164.240.76:8000/send_embeddings",
        data
      );
      history.push("/")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button className={buttonPrimary} onClick={backRoll} >Back</button>
      <button type="button" className={buttonPrimary} onClick={handleEdit}>
        Edit
      </button>
      <Pannellum
        ref={panImage}
        width="100%"
        height="87.5vh"
        image={props.imageData.image_link} //props.imageData.image_link
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
         {Object.keys(cordObj.cords).map(function (key, index) {
           console.log(key)
          return (
            <Pannellum.Hotspot
              key={index}
              type="info"
              pitch={cordObj.cords[key].y}
              yaw={cordObj.cords[key].x}
              text={key}
            />
          );
        })}
      </Pannellum>
      {edit && (
        <div>
          <InputName
            nameData={{ name: name, setName: setName }}
            setCordObj={setCordObj}
            cords={{ yaw: yaw, pitch: pitch }}
          />
          <button
            type="button"
            className={buttonSecondary}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className={buttonSuccess}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
};

export default PannellumImage;
