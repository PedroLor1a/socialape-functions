const isEmail = (email) => {
  const regEx = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validateSignupData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Email must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(data.password)) errors.password = "Must not be a empty";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords must be match";
  if (isEmpty(data.name)) errors.name = "Must not be a empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateLoginData = (data) => {
  let errors = {};
  if (isEmpty(data.email)) errors.email = "Must be not empty";
  if (isEmpty(data.password)) errors.password = "Must be not empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
