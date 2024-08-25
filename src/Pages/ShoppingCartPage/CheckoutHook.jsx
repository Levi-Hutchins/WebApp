import { useState } from "react";
const useForm = (initialValues, checkoutValidator, toast) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  
    setIsSubmitting(true);
  
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(false);
      toast.success("Order Successful !",{
        position: "bottom-right"
      })
    } else {
        toast.error("Please correct highlighted fields",{
            position: "bottom-right"
          })
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
  };
};

export default useForm;
