export const validationByRegex = (text, regexPattern) => {
  const regex = new RegExp(regexPattern);
  return regex.test(text);
};

export const usernamevalidation = (userName) => {
  if (userName && userName.length > 2) return true;
  return false;
};

export const phoneNumberValidation = (phoneNumber) => {
  if (
    phoneNumber &&
    phoneNumber.toString().length >= 10 &&
    phoneNumber.toString().length <= 12
  )
    return true;
  return false;
};
