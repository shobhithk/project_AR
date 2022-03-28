import React from "react";
import { useHistory, useParams } from "react-router-dom";

const ChoosePlan = () => {
  const history = useHistory();
  const params = useParams();

  const redirect1 = () => {
    history.push(`/${params.vid}/planmark`);
  };
  const redirect2 = () => {
    history.push(`/${params.vid}/planlink`);
  };

  return (
    <div className="d-grid gap-2 col-6 mx-auto" style={{ fontSize: "20px" }}>
      <button
        className="btn btn-outline-dark btl-lg"
        type="button"
        onClick={redirect1}
        style={{ margin: "10px" }}
      >
        Plan Mark
      </button>
      <button
        className="btn btn-outline-dark btl-lg"
        type="button"
        onClick={redirect2}
        style={{ margin: "10px" }}
      >
        Plan Link
      </button>
    </div>
  );
};

export default ChoosePlan;
