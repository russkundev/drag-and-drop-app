import { Validatable } from "../interfaces/validatable";

export const validate = (input: Validatable): boolean => {
  let isValid = true;
  const { value, required, minLength, maxLength, min, max } = input;
  const isString = typeof value === "string";

  if (required) isValid = isValid && value.toString().trim().length !== 0;

  if (minLength != null && isString)
    isValid = isValid && value.toString().length >= minLength;

  if (maxLength != null && isString)
    isValid = isValid && value.toString().length <= maxLength;

  if (min != null && !isString) isValid = isValid && value >= min;

  if (max != null && !isString) isValid = isValid && value <= max;

  return isValid;
};
