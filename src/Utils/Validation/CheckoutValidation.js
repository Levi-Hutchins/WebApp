// legacy validation solution but no time to transfer to useValidation hook
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

const checkoutValidator = (values) => {
  const errors = {};

  if (
    !values.emailAddress.trim() ||
    !/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.emailAddress.trim())
  ) {
    errors.emailAddress = true;
  }
  if (!values.suburb.trim()) {
    errors.suburb = true;
  }


  if (
    !values.phoneNumber ||
    !/^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9]) ?-?[0-9]{7,9}$/.test(
      values.phoneNumber
    )
  ) {
    errors.phoneNumber = true;
  }
  
  //TODO: Implement this address valifation find out a way
  // const isAddressValid = await validateAddress(values.streetAddress, values.postCode);
  // if (!isAddressValid) {
  //   errors.streetAddress = true;
  // }


  if (!values.postCode || !/^\d{4}$/.test(values.postCode))
    errors.postCode = true;

  if (!values.cardNumber || !/^(?:\d{4}[- ]?){3}\d{4}$/.test(values.cardNumber))
    errors.cardNumber = true;

  if (!validateExpiryDate(values.expiryDate)) errors.expiryDate = true;

  if (!values.securityCode || !/^\d{3}$/.test(values.securityCode))
    errors.securityCode = true;

  if (!values.nameOnCard.trim()) {
    errors.nameOnCard = true;
  }
  return errors;
};

export default checkoutValidator;
