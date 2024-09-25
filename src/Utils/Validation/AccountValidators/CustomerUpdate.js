const validateExpiryDate = (expiryDate) => {
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
    return false;
  }

  const [month, year] = expiryDate.split("/");
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  if (
    parseInt(year, 10) < currentYear ||
    (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)
  ) {
    return false;
  }

  return true;
};

const CustomerDetailsValidator = (details, editRowIndex) => {
  const errors = {};
  const [
    { value: emailAddress },
    { value: phoneNumber },
    { value: streetAddress },
    { value: postCode },
    { value: suburb },
    { value: state },
    { value: cardOwner },
    { value: cardNumber },
    { value: expiryDate },
    { value: cvv }
  ] = details;

  if (editRowIndex === 0 && (!emailAddress.trim() || !/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailAddress.trim()))) {
    errors[editRowIndex] = true;
  }

  if (editRowIndex === 1 && (!phoneNumber || !/^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9]) ?-?[0-9]{7,9}$/.test(phoneNumber))) {
    errors[editRowIndex] = true;
  }

  if (editRowIndex === 2 && !streetAddress.trim()) {
    errors[editRowIndex] = true;
  }

  if (editRowIndex === 3 && (!postCode || !/^\d{4}$/.test(postCode))) {
    errors[editRowIndex] = true;
  }

  if (editRowIndex === 4 && !suburb.trim()) {
    errors[editRowIndex] = true;
  }

  if (editRowIndex === 5 && (!state.trim() || !(new Set(["NSW", "QLD"]).has(state)))) {
    errors[editRowIndex] = true;
  }

  if (editRowIndex === 6 && !cardOwner.trim()) {
    errors[editRowIndex] = true;
  }

  if (editRowIndex === 7 && (!cardNumber || !/^(?:\d{4}[- ]?){3}\d{4}$/.test(cardNumber))) {
    errors[editRowIndex] = true;
  }

  if (editRowIndex === 8 && !validateExpiryDate(expiryDate)) {
    errors[editRowIndex] = true;
  }

  if (editRowIndex === 9 && (!cvv || !/^\d{3}$/.test(cvv))) {
    errors[editRowIndex] = true;
  }

  return errors;
};

export default CustomerDetailsValidator;
  