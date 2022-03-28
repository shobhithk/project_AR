import React from "react";
import useInput from "../../Hooks/use-input";

const InputPlan = (props) => {
  const {
    value: inputName,
    valueIsValid: enteredNameIsValid,
    hasError: enteredInputisInValid,
    inputHandler,
    onBlurHandler,
    reset:nameReset
  } = useInput((value) => value.trim() !== "");

  let isFormValid = false;
  if (enteredNameIsValid) isFormValid = true;

  const formSubmitHandler = (event) => {
    event.preventDefault();
   
    if (!enteredNameIsValid) return;
    props.setCheckAreas(true)
    props.setMapAreas((map) => ({
        name: [map.name],
        areas: [
          ...map.areas,
          {name:[inputName], shape: "circle", coords: [props.cords.x,props.cords.y,10], preFillColor: "#fff" },
        ],
      }));
    
    nameReset();
    
  };
  const inputClass = enteredInputisInValid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={inputClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          onChange={inputHandler}
          onBlur={onBlurHandler}
          id="name"
          value={inputName}
        />
        {enteredInputisInValid && (
          <p className="error-text">enter valid input</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Commit</button>
      </div>
    </form>
  );
};

export default InputPlan;
