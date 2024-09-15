import { useState } from "react";
import axios from "axios";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = signUpValidator(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios
          .get(
            "http://localhost:8080/api/v1/db/data/v1/inft3050/User/find-one",
            {
              headers: {
                "xc-token": process.env.REACT_APP_APIKEY,
              },
              params: {
                where: `(Email,eq,${values.emailAddress})`,
              },
            }
          )
          .then((user) => {
            if (!Object.keys(user.data).length) {

              //TODO: make post request to create user, waiting on error someone else reported


              toast.success("Sign Up Successful !", {
                position: "bottom-right",
              });
            } else {
              toast.error("User already exists with this email", {
                position: "bottom-right",
              });
            }
          });
      } catch (error) {
        console.error("Error during user lookup:", error);
        toast.error(
          "There was an error during sign up. Please try again later.",
          {
            position: "bottom-right",
          }
        );
      }
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
