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
    // update form values based on input changes
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate form values before submitting
    if (!validateSignUp(values)) {
      return;
    }

    try {
      // check if user already exists by email
      const response = await axios.get(
        "http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/find-one",
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
          params: {
            where: `(Email,eq,${values.Email})`,
          },
        }
      );

      if (!Object.keys(response.data).length) {
        // hash password and create new user object
        const passwordSalt = await hashPassword(values.Password);
        const userToAdd = {
          Email: values.Email,
          Name: values.Name,
          Salt: passwordSalt.salt,
          HashPW: passwordSalt.hash,
        };

        try {
          // add user to the database
          const userResponse = await axios.post(
            "http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons",
            userToAdd,
            {
              headers: {
                "xc-token": process.env.REACT_APP_APIKEY,
              },
            }
          );

          if (userResponse) {
            // create associated TO record for the user
            await axios.post(
              "http://localhost:8080/api/v1/db/data/v1/inft3050/TO",
              { PatronId: userResponse.data.UserID, Email: userToAdd.Email },
              {
                headers: {
                  "xc-token": process.env.REACT_APP_APIKEY,
                },
              }
            );
            toast.success("user created!", { position: "bottom-right" });
            setTimeout(() => {
              navigate("/LogIn"); // navigate to login page after user creation
            }, 2000);
          }
        } catch (error) {
          toast.error("oops! an error occurred", {
            position: "bottom-right",
          });
        }
      } else {
        toast.error("user already exists with this email", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("error during user lookup:", error);
      toast.error(
        "there was an error during sign up. please try again later.",
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
