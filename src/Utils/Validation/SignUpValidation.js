const signUpValidator = (values) => {
    const errors = {};

    if (!values.fullName?.trim()) {
      errors.fullName = true;
    }


    if (!values.password?.trim() || values.password?.length < 8) {
        errors.password = true;
    }
    if (!values.confirmPassword?.trim() || values.confirmPassword !== values.password) {
        errors.confirmPassword = true;
      }

    if (!values.streetAddress?.trim()) {
        errors.streetAddress = true;
    }

    if (!values.emailAddress?.trim() || !/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(values?.emailAddress)) {
        errors.emailAddress = true;
    }
    //eslint-disable-next-line
    if (
        !values.phoneNumber ||
        !/^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9]) ?-?[0-9]{7,9}$/.test(
          values.phoneNumber
        )
      ) {
        errors.phoneNumber = true;
      }

    return errors
}

export default signUpValidator;