import { toast } from "react-toastify";

const useValidation = () => {
  const validateEditValues = (itemFound) => {
    if (!itemFound.Name || itemFound.Name.trim() === "") {
      toast.error("Name cannot be empty", { position: "bottom-right" });
      return false;
    }
    if (!itemFound.Author || itemFound.Author.trim() === "") {
      toast.error("Author cannot be empty", { position: "bottom-right" });
      return false;
    }

    if (itemFound.Description && !itemFound.Description.trim().endsWith(".")) {
      toast.error("Description must end with a full stop", {
        position: "bottom-right",
      });
      return false;
    }

    const genre = parseInt(itemFound.Genre, 10);
    if (isNaN(genre) || genre < 1 || genre > 3) {
      toast.error("Genre must be an integer between 1 and 3", {
        position: "bottom-right",
      });
      return false;
    }

    const subGenre = parseInt(itemFound.SubGenre, 10);
    if (isNaN(subGenre) || subGenre < 1 || subGenre > 14) {
      toast.error("SubGenre must be an integer between 1 and 14", {
        position: "bottom-right",
      });
      return false;
    }

    return true;
  };
  const validateAddItem = (newItem) => {
    if (!newItem.Name || newItem.Name.trim() === "") {
      toast.error("Name cannot be empty", { position: "bottom-right" });
      return false;
    }
    if (!newItem.Author || newItem.Author.trim() === "") {
      toast.error("Author cannot be empty", { position: "bottom-right" });
      return false;
    }
    if (!newItem.Description || !newItem.Description.trim().endsWith(".")) {
      toast.error("Description must end with a full stop", {
        position: "bottom-right",
      });
      return false;
    }
    if (
      !newItem.Published.trim() ||
      !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/.test(
        newItem.Published
      )
    ) {
      toast.error("Date must in form DD/MM/YYYY", { position: "bottom-right" });
      return false;
    }
    return true;
  };
  const validateAddUser = (user) => {
    if (!user.UserName || user.UserName.trim() === "") {
      toast.error("User must have a username", { position: "bottom-right" });
      return false;
    }
    if (!user.UserName || user.UserName.trim() === "") {
      toast.error("User must has a username", { position: "bottom-right" });
      return false;
    }
    if (
      !user.Email?.trim() ||
      !/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(user?.Email)
    ) {
      toast.error("Please enter a valid email address", {
        position: "bottom-right",
      });
      return false;
    }
    if (!user.Name || user.Name.trim() === "") {
      toast.error("User must have a name", { position: "bottom-right" });
      return false;
    }
    if (!user.Password || user.Password.trim() === "") {
      toast.error("Invalid Password", { position: "bottom-right" });
      return false;
    }
    if (!user.ConfirmPassword || user.ConfirmPassword.trim() === "") {
      toast.error("Invalid Password", { position: "bottom-right" });
      return false;
    }
    if (user.ConfirmPassword !== user.Password) {
      toast.error("Passwords do not match", { position: "bottom-right" });
      return false;
    }
    return true;
  };

  return { validateEditValues, validateAddItem, validateAddUser};
};

export default useValidation;
