const CustomerDetailsValidator = (details, editRowIndex) => {
    //TODO: Find a way to add descriptive error messages for each error encountered in validation
    const errors = {};
  
    const [
      { value: fullName },
      { value: emailAddress },
      { value: phoneNumber },
      { value: streetAddress },
      { value: password },
    ] = details;
  
    if (!fullName.trim() && editRowIndex === 0) {
      errors[editRowIndex] = true;
    }
    if (
      (!emailAddress.trim() || !/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailAddress.trim())) &&
      editRowIndex === 1
    ) {
      errors[editRowIndex] = true;
    }
    if (!phoneNumber.trim() && editRowIndex === 2) {
      errors[editRowIndex] = true;
    }
    if (!streetAddress.trim() && editRowIndex === 3) {
      errors[editRowIndex] = true;
    }
    if ((!password.trim() || password.length < 10) && editRowIndex === 4) {
      errors[editRowIndex] = true;
    }
  
    return errors;
  };
  
  export default CustomerDetailsValidator;
  