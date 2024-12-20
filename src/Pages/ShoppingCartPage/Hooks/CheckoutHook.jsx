import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { emptyCart } from "../../../Redux/Cart/CartSlice"; // Adjust the path

const useForm = (initialValues, checkoutValidator, toast) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);



  // Handle input changes
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

  // Check if the user exists by email
  const checkIfUserExists = async (email) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/db/data/v1/inft3050/TO/find-one?",
        {
          headers: { "xc-token": process.env.REACT_APP_APIKEY },
          params: {
            where: `(Email,eq,${email})`,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error("Error fetching existing user!", {
        position: "bottom-right",
      });
      throw error;
    }
  };

  // Compare user details and update if necessary
  const updateUserDetails = async (userId, currentDetails, newDetails) => {
    const detailsDiffer = JSON.stringify(currentDetails) !== JSON.stringify(newDetails);

    if (detailsDiffer) {
      try {
        await axios.patch(
          `http://localhost:8080/api/v1/db/data/v1/inft3050/TO/${userId}`,
          newDetails,
          {
            headers: { "xc-token": process.env.REACT_APP_APIKEY },
          }
        );

              } catch (error) {
        toast.error("Error updating user details.", {
          position: "bottom-right",
        });
        console.log(error);
      }
    } else {
      toast.success("Order Confirmed!", {
        position: "bottom-right",
      });
    }
  };
  const createOrder = async (existingUser, userDetails) => {
    const newOrder = {
      Customer: existingUser.CustomerID,
      StreetAddress: userDetails.StreetAddress,
      PostCode: userDetails.PostCode,
      Suburb: userDetails.Suburb,
      State: userDetails.State
    }
    try{
      await axios.post(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/Orders`,
        newOrder,
        {
          headers: { "xc-token": process.env.REACT_APP_APIKEY },
        }
      );
    }catch (err){
      toast.error("Error creating order.", {
        position: "bottom-right",
      });    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if(cartItems.length === 0){
      toast.error("No Items In Cart !",{
        position: "bottom-right",
      })
      return;
    }

    const validationErrors = checkoutValidator(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
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

      try {
        const existingUser = await checkIfUserExists(values.emailAddress);
        console.log(existingUser)
        if (existingUser && Object.keys(existingUser).length > 0) {
            // Destructure to exclude certain fields and create updated user details
            const { CustomerID, PatronId, Patrons, "Orders List": _, ...compareValues } = existingUser;
            
            // Update user details if necessary
            await updateUserDetails(existingUser.CustomerID, compareValues, userDetails);
            
            // Create order for the existing user
            await createOrder(existingUser, userDetails);
            
            // Show success message
            toast.success("Order Confirmed!", {
                position: "bottom-right",
            });
            
            // Empty the cart after order confirmation
            dispatch(emptyCart());
        } else {
            // No user found, show an error message
            toast.error("You need an account to purchase.", {
                position: "bottom-right",
            });
            return;
        }
    
    } catch (error) {
        console.log(error);
        toast.error("An error occurred while processing your order.", {
            position: "bottom-right",
        });
    }}
   
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
