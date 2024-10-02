import { toast } from 'react-toastify';

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
      toast.error("Description must end with a full stop", { position: "bottom-right" });
      return false;
    }

    const genre = parseInt(itemFound.Genre, 10);
    if (isNaN(genre) || genre < 1 || genre > 3) {
      toast.error("Genre must be an integer between 1 and 3", { position: "bottom-right" });
      return false;
    }

    const subGenre = parseInt(itemFound.SubGenre, 10);
    if (isNaN(subGenre) || subGenre < 1 || subGenre > 14) {
      toast.error("SubGenre must be an integer between 1 and 14", { position: "bottom-right" });
      return false;
    }

    return true;
  };

  return { validateEditValues };
};

export default useValidation;
