// CheckoutDetails.js
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import useCustomerDetails from "../Hooks/useCustomerDetails";
import useUpdateCustomerDetails from "../Hooks/useUpdateCustomerDetails";
import styles from '../Styles/CheckoutDetails.module.css';
import CustomButton from "../../../shared-components/Button/CustomButton";

const CheckoutDetails = ({ loggedInUser, setLoading }) => {
  const { checkOutDetails } = useCustomerDetails(loggedInUser, setLoading);
  const { updateCheckoutDetails } = useUpdateCustomerDetails();
  const [isEditing, setIsEditing] = useState({
    CardNumber: false,
    CardOwner: false,
    PhoneNumber: false,
    StreetAddress: false,
    ExpiryDate: false,
    CVV: false,
  });
  const [editedDetails, setEditedDetails] = useState(checkOutDetails);

  useEffect(() => {
    setEditedDetails(checkOutDetails);
  }, [checkOutDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async (field) => {
    const { CardNumber, CardOwner, PhoneNumber, StreetAddress, ExpiryDate, CVV } = editedDetails;
  
    if (field === "CardNumber" && CardNumber.length !== 16) {
      toast.error("Card Number must be 16 digits", { position: "bottom-right" });
      return;
    }
    if (field === "PhoneNumber" && PhoneNumber.length !== 10) {
      toast.error("Phone Number must be 10 digits", { position: "bottom-right" });
      return;
    }
    if (field === "ExpiryDate") {
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; 
      if (!expiryRegex.test(ExpiryDate)) {
        toast.error("Expiry Date must be in MM/YY format", { position: "bottom-right" });
        return;
      }
  
      const [month, year] = ExpiryDate.split("/").map(Number);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
  
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        toast.error("Expiry Date must be in the future", { position: "bottom-right" });
        return;
      }
    }
  
    try {
      await updateCheckoutDetails([{ accountValue: field, value: editedDetails[field] }], checkOutDetails.ID);
      toast.success(`${field} updated successfully`, { position: "bottom-right" });
      toggleEdit(field); 
    } catch (error) {
      toast.error("Failed to update checkout details", { position: "bottom-right" });
    }
  };
  

  return (
    <div className={styles["panel"]}>
      <h2 style={{color: "white"}}>Checkout Details</h2>

      {Object.keys(editedDetails).map((field) => (
        field !== "ID" && (
          <TextField
            key={field}
            label={field.replace(/([A-Z])/g, " $1")}
            name={field}
            value={editedDetails[field] || ""}
            onChange={handleInputChange}
            disabled={!isEditing[field]}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {isEditing[field] ? (
                    <CustomButton
                      displayIcon={<SaveIcon />}
                      onClick={() => handleSave(field)}
                    />
                  ) : (
                    <CustomButton
                      displayIcon={<EditIcon />}
                      onClick={() => toggleEdit(field)}
                    />
                  )}
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#1c1c2b",
              input: { color: "#ffffff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#5e43f3" },
                "&:hover fieldset": { borderColor: "#5e43f3" },
                "&.Mui-focused fieldset": { borderColor: "#5e43f3" },
              },
              "& .MuiInputLabel-root": { color: "#ffffff" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#ffffff" },
            }}
          />
        )
      ))}
    </div>
  );
};

export default CheckoutDetails;
