import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Input,
  Grid,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PanoForm from "./PanoForm";
import upload from "../../Assets/Images/upload.jpg";

const UploadPano = () => {
  const cid = 1;
  const parammeters = useParams();


  const [file, setFile] = useState(null);
  const [load, setLoad] = useState(null);
  const [img, setImg] = useState(null);

  const fileSelectedHandler = (event) => {
    setFile(event.target.files[0]);
    setImg(URL.createObjectURL(event.target.files[0]));
  };

  const fileUploadHandler = async (inputName) => {
    try {
      const fd = new FormData();
      fd.append("file", file);
      const params = {
        image_name: inputName,
        virtual_tour_id: parammeters.vid,
        customer_id: cid,
      };
      console.log(FileList, params);
      const resopnse = await axios.post(
        "http://54.164.240.76:8000/insert_360_image",
        fd,
        {
          params,
          onUploadProgress: (ProgressEvent) => {
            setLoad(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
          },
        }
      );
      setLoad(null)
      console.log(resopnse);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {load && <LinearProgress variant="determinate" value={load} />}
      <Grid container space={2}>
        <Grid item xs={12} md={8} lg={8}>
          <label htmlFor="icon-button-file">
            <div style={{ margin: "2em", border: "dotted" }}>
              {
                <img
                  src={img ? img : upload}
                  alt="upload"
                  style={{ width: "20em", height: "20em", margin: "5em" }}
                />
              }
            </div>
            <Input
              style={{ display: "none" }}
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={fileSelectedHandler}
            />

            <Button
              style={{ marginLeft: "10em" }}
              color="primary"
              variant="contained"
              aria-label="upload picture"
              component="span"
              size="large"
            >
              <span style={{ marginRight: "1em" }}>Upload</span>
              <FontAwesomeIcon icon={faUpload} />
            </Button>
          </label>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <PanoForm
            fileSubmitHandler={fileUploadHandler}
            setImg={setImg}
            setLoad={setLoad}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default UploadPano;
