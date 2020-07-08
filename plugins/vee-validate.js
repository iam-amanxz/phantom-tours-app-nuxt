import { extend, setInteractionMode } from "vee-validate";
import {
  required,
  alpha_spaces,
  email,
  digits,
  max,
  min,
  is,
  between
} from "vee-validate/dist/rules";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "This field is required"
});

extend("is", {
  ...is,
  message: "Secret key doesn't match"
});

// extend("numaric", {
//   ...numaric,
//   message: "This field must have a numaric value"
// });

extend("between", {
  ...between,
  message: "This field must be a numaric value and between the required amount"
});

extend("alpha_spaces", {
  ...alpha_spaces,
  message: "This field must only contain alphabetic characters"
});

extend("email", {
  ...email,
  message: "Please enter a valid email address 'something@example.com'"
});

extend("digits", {
  ...digits,
  message: "Please enter a valid phone number"
});

extend("max", {
  ...max,
  message: "Charecter exceeded limit"
});

extend("min", {
  ...min,
  message: "Not enough charecters"
});
