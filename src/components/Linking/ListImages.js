import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DisplayImageList from "./DisplayImageList";
import { useLocation,useParams } from "react-router-dom";
import FilteredImage from "./FilteredImage";

function ListImages(props) {
  const [imageState, setImageState] = useState();

  const location = useLocation();
  const params = useParams()
  const fetchImageHandler = useCallback(async () => {
    try {
      const response = await axios.get("http://54.164.240.76:8000/get_images", {
        params: { virtual_tour_id: params.vid?params.vid:props.vid },
      });
      setImageState(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, [params.vid,props.vid]);

  useEffect(() => {
    fetchImageHandler();
  }, [fetchImageHandler]);
 
  if (location.pathname === `/${params.vid}/link`) {
    return (
      <>
        {imageState &&
          Object.keys(imageState).map((key, i) => (
            <DisplayImageList key={i} imageId={key} mark={false} vid={params.vid} >
              {imageState[key]}
            </DisplayImageList>
          ))}
      </>
    );
  }

  if (location.pathname === `/${params.vid}/mark`) {
    return (
      <>
        {imageState &&
          Object.keys(imageState).map((key, i) => (
            <DisplayImageList key={i} imageId={key} mark={true}>
              {imageState[key]}
            </DisplayImageList>
          ))}
      </>
    );
  }

  return (
    <>
      {imageState && (
        <div className="sidenav">
          {Object.keys(imageState).map((key, i) =>
            key != props.imageId ? (
              <FilteredImage
                key={i}
                imageId={key}
                parent_imageId={props.imageId}
                setId={props.setId}
              >
                {imageState[key]}
              </FilteredImage>
            ) : (
              <div className="none" key={i}></div>
            )
          )}
        </div>
      )}
    </>
  );
}

export default ListImages;
