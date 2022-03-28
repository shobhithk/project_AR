import React from "react";
import { Pannellum } from "pannellum-react";
import pano from '../Assets/Images/pano6.jpg'

const Images = () => {
  return (
    <>
      <Pannellum
        width="100%"
        height="94.7vh"
        image={pano}
        pitch={10}
        yaw={180}
        hfov={window.innerWidth < 780 ? 100 : 100}
        autoLoad
        draggable
        orientationOnByDefault={false}
        showZoomCtrl={false}
        compass={true}
        autoRotate={1}
      ></Pannellum>
    </>
  );
};

export default Images;
