import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const GetMarkVid = (props) => {
  const cid = 1;

  const [vids, setVids] = useState();

  const fetchVidHandler = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://54.164.240.76:8000/get_virtual_tours",
        {
          params: { customer_id: cid },
        }
      );
      setVids(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchVidHandler();
  }, [fetchVidHandler]);

  const history = useHistory();

  return (
    <>
      {vids &&
        Object.keys(vids).map((vid, index) => (
          <div
            key={index}
            className="d-grid gap-2 col-6 mx-auto"
            style={{ fontSize: "20px" }}
          >
            <button
              className="btn btn-outline-dark btl-lg"
              type="button"
              onClick={() => {
                history.push(`/${vid}/mark`);
              }}
              style={{ margin: "10px" }}
            >
              {vid}
            </button>
          </div>
        ))}
    </>
  );
};

export default GetMarkVid;
