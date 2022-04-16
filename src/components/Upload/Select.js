import React from "react";
import { Button } from "@material-ui/core";
import { useHistory,useParams } from "react-router-dom";


const Select = () => {
    const params = useParams()
    const history = useHistory()
    
    const planUpload = ()=>{
        history.push(`/${params.vid}/uploadplan`)
    }   

    const imageUpload = ()=>{
        history.push(`/${params.vid}/uploadimage`)
    }

  return (
    <>
      <Button variant="contained" size="large" onClick={planUpload}>
        Plan
      </Button>
      <Button variant="contained" size="large" onClick={imageUpload}>
        Image
      </Button>
    </>
  );
};

export default Select;
