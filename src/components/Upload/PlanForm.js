import React from "react";
import useInput from "../../Hooks/use-input";

const PlanForm = (props) => {
  const {
    value: inputName,
    valueIsValid: enteredNameIsValid,
    hasError: enteredInputisInValid,
    inputHandler,
    onBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: inputLatitude,
    valueIsValid: enteredLatitudeIsValid,
    hasError: enteredFormLatitudeIsInvalid,
    inputHandler: inputLatitudeHandler,
    onBlurHandler: onBlurLatitudeHandler,
    reset: latitudeReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: inputLongitude,
    valueIsValid: enteredLongitudeIsValid,
    hasError: enteredFormLongitudeIsInvalid,
    inputHandler: inputLongitudeHandler,
    onBlurHandler: onBlurLongitudeHandler,
    reset: longitudeReset,
  } = useInput((value) => value.trim() !== "");

  let isFormValid = false;
  if (enteredNameIsValid && enteredLatitudeIsValid && enteredLongitudeIsValid)
    isFormValid = true;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (
      !enteredNameIsValid &&
      !enteredLatitudeIsValid &&
      !enteredLongitudeIsValid
    )
      return;

    console.log();
    props.fileSubmitHandler(inputName, inputLatitude, inputLongitude);
    nameReset();
    latitudeReset();
    longitudeReset();
  };
  const inputClass = enteredInputisInValid
    ? "form-control invalid"
    : "form-control";
  const latitudeClass = enteredFormLatitudeIsInvalid
    ? "form-control invalid"
    : "form-control";
  const longitudeClass = enteredFormLongitudeIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={inputClass}>
        <label htmlFor="name">Name</label>
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
      <div className={latitudeClass}>
        <label htmlFor="email">Latitude</label>
        <input
          type="text"
          onChange={inputLatitudeHandler}
          onBlur={onBlurLatitudeHandler}
          id="id"
          value={inputLatitude}
        />
        {enteredFormLatitudeIsInvalid && (
          <p className="error-text">enter valid input</p>
        )}
      </div>
      <div className={longitudeClass}>
        <label htmlFor="email">Longitude</label>
        <input
          type="text"
          onChange={inputLongitudeHandler}
          onBlur={onBlurLongitudeHandler}
          id="id"
          value={inputLongitude}
        />
        {enteredFormLongitudeIsInvalid && (
          <p className="error-text">enter valid input</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default PlanForm;
