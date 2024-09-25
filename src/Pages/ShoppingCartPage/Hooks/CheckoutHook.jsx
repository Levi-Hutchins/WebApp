import axios from "axios";
import { useState } from "react";

const useForm = (initialValues, checkoutValidator, toast) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    const fieldError = checkoutValidator({ ...values, [name]: value })[name];

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = checkoutValidator(values);
    setErrors(validationErrors);
    const userDetails = {
      Email: values.emailAddress,
      PhoneNumber: values.phoneNumber,
      StreetAddress: values.streetAddress,
      PostCode: values.postCode,
      Suburb: values.suburb,
      State: values.state,
      CardNumber: values.cardNumber,
      CardOwner: values.nameOnCard,
      Expiry: values.expiryDate,
      CVV: values.securityCode,
    };
    if (Object.keys(validationErrors).length === 0) {
      axios
        .get("http://localhost:8080/api/v1/db/data/v1/inft3050/TO/find-one?", {
          headers: { "xc-token": process.env.REACT_APP_APIKEY },
          params: {
            where: `(Email,eq,${values.emailAddress})`,
          },
        })
        .then((existingUser) => {
          if (existingUser.data && Object.keys(existingUser.data).length > 0) {
            // We check if there is  existing user details, if so update with most recent values
            // hnadle any errors
            console.log("User found updating")
            axios
              .patch(
                `http://localhost:8080/api/v1/db/data/v1/inft3050/TO/${existingUser.data.CustomerID}`,
                userDetails,
                {
                  headers: { "xc-token": process.env.REACT_APP_APIKEY },
                }
              )
              .then((data) => {
                toast.success("Order Confirmed!", {
                  position: "bottom-right",
                });
              })
              .catch((error) => {
                toast.error("Oops, Something went wrong!", {
                  position: "bottom-right",
                });
                console.log(error)
              });
          } else {
            // No user details found so create new values
            console.log("no User found creating")

            axios
              .post(
                "http://localhost:8080/api/v1/db/data/v1/inft3050/TO",
                userDetails,
                {
                  headers: { "xc-token": process.env.REACT_APP_APIKEY },
                }
              )
              .then((data) => {
                toast.success("Order Confirmed!", {
                  position: "bottom-right",
                });
              })
              .catch((error) => {
                toast.error("Oops, Something went wrong!", {
                  position: "bottom-right",
                });
              });
          }
        })
        .catch((error) => {
          toast.error("Error fetching existing user!", {
            position: "bottom-right",
          });
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
