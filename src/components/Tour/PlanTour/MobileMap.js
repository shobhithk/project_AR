import React, { useState, useCallback, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import axios from "axios";
import "../../../App.css";

const MobileMap = (props) => {
  const [pos, setPos] = useState();
  const [pWidth, setPWidth] = useState(100);
  const [display, setDisplay] = useState(true);
  const [link,setLink] = useState(null)

  console.log(props);
  if(!link){
    setLink(props.planLink.plan_link)
  }

  const imageMap = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://54.164.240.76:8000/get_current_plan_position",
        {
          params: {
            image_id: props.imageId,
          },
        }
      );

      setPos(Object.keys(response.data)[0]);
    } catch (err) {
      console.error(err);
    }
  }, [props.imageId]);

  let mapData = {
    name: "myName",
    areas: [],
  };
  const { planId: image_id, co_ordinates } = props.planEmbed;
  const eids = Object.keys(co_ordinates);
  eids.map((key) => {
    let desc = {
      id: key,
      name: co_ordinates[key].coordinate_name,
      shape: "circle",
      coords: [co_ordinates[key].x, co_ordinates[key].y, 15],
      preFillColor: key === pos ? "#FF1818" : "#fff",
    };
    mapData.areas.push(desc);
  });

  useEffect(() => {
    imageMap();
  }, [imageMap]);

  const linkClickHandler = async (eid) => {
    try {
      const response = await axios.get(
        "http://54.164.240.76:8000/get_linking_image_plan",
        {
          params: {
            embedding_id: eid,
          },
        }
      );
      props.setIsComplete(false);
      props.setIsOk(false);
      props.setImageId(response.data.image_id);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <div className="info2">
        
        {pos && display && (
          <ImageMapper
            src={link}
            onClick={(event) => {
              linkClickHandler(event.id);
            }}
            map={mapData}
            imgWidth={500}
            width={pWidth}
            height={pWidth}
            onImageClick={() => setPWidth((prev) => (prev === 100 ? 200 : 100))}
          />
        )}
      </div>
    </>
  );
};

export default MobileMap;