import { useState } from "react";
const useForm = (initialValues, signUpValidator, toast) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    const fieldError = signUpValidator({ ...values, [name]: value })[name];

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = signUpValidator(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      toast.success("Sign Up Successful !", {
        position: "bottom-right",
      });
    } else {
      toast.error("Please correct highlighted fields", {
        position: "bottom-right",
      });
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
