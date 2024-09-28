const AccountDetailsValidation = (details, editRowIndex) => {
  const errors = {};
  const [{ value: fullName }, { value: emailAddress }] = details;

  if (editRowIndex === 0 && !fullName.trim()) {
    errors[editRowIndex] = true;
  }
  if (
    editRowIndex === 1 &&
    (!emailAddress.trim() ||
      !/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailAddress.trim()))
  ) {
    errors[editRowIndex] = true;
  }

  return errors;
};

export default AccountDetailsValidation;
