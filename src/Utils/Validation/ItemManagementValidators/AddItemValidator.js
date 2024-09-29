const AddItemValidator = (details) => {
    console.log(details)
  const errors = {};
  const { Name, Author, Description, Genre, SubGenre, Published } = details;

  if (!Name.trim()) {
    errors.Name = true;
  }
  if (!Author.trim()) {
    errors.Author = true;
  }
  if (!Description.trim() || Description.length < 5) {
    errors.Description = true;
  }
  if (!Genre) {
    errors.Genre = true;
  }
  if (!SubGenre) {
    errors.SubGenre = true;
  }
  if (
    !Published.trim() ||
    !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/.test(Published)
  ) {
    errors.Published = true;
  }
  return errors;
};
export default AddItemValidator;
