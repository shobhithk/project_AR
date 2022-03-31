import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Input, IconButton, Grid, Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const UploadPano = () => {
  const cid = 1;
  const parammeters = useParams();

  const inputRef = useRef(null);
  const [file, setFile] = useState({
    selectedFile: null,
  });
  const [name, setName] = useState();

  const fileSelectedHandler = (event) => {
    setFile({
      selectedFile: event.target.files[0],
    });
  };

  const fileUploadHandler = async () => {
    try {
      console.log(file.selectedFile)
      const params = {
        image_name: name,
        virtual_tour_id: +parammeters.vid,
        customer_id: cid,
      };
      const resopnse = await axios.post(
        "http://54.164.240.76:8000/insert_360_image",
        file.selectedFile,
        params
      );
      console.log(resopnse);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
 
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={fileSelectedHandler}
            />
            <Button onClick={console.log(inputRef)}>Pick File</Button>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={fileUploadHandler}
            >
              <FontAwesomeIcon icon={faCamera} />
            </IconButton>
          </label>
    </>
  );
};

export default UploadPano;
