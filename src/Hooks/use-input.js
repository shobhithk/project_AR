import { useState } from "react";

const useInput = (validate) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validate(inputValue);
  const valueHasError = !valueIsValid && isTouched;

  const inputHandler = (event) => {
    setInputValue(event.target.value);
  };

  const onBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setInputValue("");
    setIsTouched(false);
  };

  return {
    value: inputValue,
    valueIsValid,
    hasError: valueHasError,
    inputHandler,
    onBlurHandler,
    reset,
  };
};

export default useInput;
