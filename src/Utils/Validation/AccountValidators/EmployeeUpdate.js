const EmployeeDetailsValidator= (details, editRowIndex) => {
    const errors = {};
    const [
        { value: UserName },
        { value: Email },
        { value: Name },
      ] = details;
      console.log("Validating: ", details)
      if (!UserName.trim() && editRowIndex === 0) {
        errors[editRowIndex] = true;
      }
      if (
        (!Email.trim() || !/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email.trim())) &&
        editRowIndex === 1
      ) {
        errors[editRowIndex] = true;
      }
      if (!Name.trim() && editRowIndex === 2) {
        errors[editRowIndex] = true;
      }
      return errors
}

export default EmployeeDetailsValidator;