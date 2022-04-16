import React from 'react'
import { useHistory } from 'react-router-dom'

const GetVid = () => {

    const vid =1

    const history = useHistory();

    const redirect = () => {
      history.push(`/${vid}/plan`);
      
    };
  
  
    return (
      <div className="d-grid gap-2 col-6 mx-auto" style={{"fontSize":"20px"}}>
      <button
        className="btn btn-outline-dark btl-lg"
        type="button"
        onClick={redirect}
        style={{ "margin": "10px" }}
      >
        {vid}
      </button>
    </div>
    )
  }

export default GetVid