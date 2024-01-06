const validateData = (data, schema) => {
  const { value, error } = schema.validate(data);
  return { value, isError: error ? true : false, error };
};

module.exports = validateData;