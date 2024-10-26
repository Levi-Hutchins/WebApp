import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { hashPassword } from "../../../Utils/HahingService";
import useValidation from "./useValidation";
import { useNavigate } from "react-router-dom";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const { validateSignUp } = useValidation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignUp(values)) {
      return;
    }

    try {
      await axios
        .get(
          "http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/find-one",
          {
            headers: {
              "xc-token": process.env.REACT_APP_APIKEY,
            },
            params: {
              where: `(Email,eq,${values.Email})`,
            },
          }
        )
        .then((user) => {
          if (!Object.keys(user.data).length) {
            const passwordSalt = hashPassword(values.password);
            const userToAdd = {
              Email: values.Email,
              Name: values.Name,
              Salt: passwordSalt.salt,
              HashPW: passwordSalt.hash,
            };
            axios.post(
              "http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons",
              userToAdd,
              {
                headers: {
                  "xc-token": process.env.REACT_APP_APIKEY,
                },
              }
            );
            axios
              .post(
                "http://localhost:8080/api/v1/db/data/v1/inft3050/TO",
                {Email: userToAdd.Email},
                {
                  headers: {
                    "xc-token": process.env.REACT_APP_APIKEY,
                  },
                }
              )
              .then((user) => {
                if (user) {
                  toast.success("User Created !", {
                    position: "bottom-right",
                  });
                  setTimeout(() => {
                    navigate("/LogIn");
                  }, 2000);
                }
              })
              .catch((error) => {
                toast.error("Oops ! An error occurred", {
                  position: "bottom-right",
                });
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
  };

  return {
    values,
    handleChange,
    handleSubmit,
    setValues,
  };
};

export default useForm;
