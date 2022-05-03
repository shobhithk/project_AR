import React from "react";
import classes from "./LoadingSpinner.module.css";
import load from "../../Assets/Gif/load_bubble.gif";

const LoadingSpinner = () => {
  // return <div className={classes.spinner}></div>;
  return <img className={classes.loc} src={load} alt="loading"/>;
};

export default LoadingSpinner;
