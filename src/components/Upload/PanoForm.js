import React from "react";
import useInput from "../../Hooks/use-input";

const InputName = (props) => {
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

    props.fileSubmitHandler(inputName)
    
    nameReset();
    
  };
  const inputClass = enteredInputisInValid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler} style={{"margin":"5em 1em" }}>
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
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default InputName;
