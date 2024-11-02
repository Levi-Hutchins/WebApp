import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import useEmployeeDetails from "../Hooks/useEmployeeDetails";
import styles from '../Styles/Account.module.css';
import CustomButton from "../../../shared-components/Button/CustomButton";
import useUpdateEmployee from "../Hooks/useUpdateEmployee";

const EmployeeAccountDetails = ({ loggedInUser, setLoading }) => {
  const { userDetails } = useEmployeeDetails(loggedInUser, setLoading);
  const { updateEmployeeDetails } = useUpdateEmployee(); 
  const [previousID, setPreviousID] = useState("");
  const [isEditing, setIsEditing] = useState({
    UserName: false,
    Name: false,
    Email: false,
  });
  const [editedDetails, setEditedDetails] = useState(userDetails);

  useEffect(() => {
    setEditedDetails(userDetails);
  }, [userDetails]);

  const handleInputChange = (e) => {
    setPreviousID(userDetails.UserName)
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    const { UserName, Name, Email } = editedDetails;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!UserName || !Name) {
        toast.error("UserName and Name cannot be empty", { position: "bottom-right" });
        return;
    }

    if (!emailRegex.test(Email)) {
        toast.error("Please enter a valid email address", { position: "bottom-right" });
        return;
    }

    try {
        await updateEmployeeDetails(
            [
                { accountValue: "UserName", value: UserName },
                { accountValue: "FullName", value: Name },
                { accountValue: "EmailAddress", value: Email }
            ],
            previousID 
        );

        const loginData = JSON.parse(localStorage.getItem("LogInData"));
        if (loginData && loginData.EmailAddress) {
            loginData.EmailAddress = Email;
            localStorage.setItem("LogInData", JSON.stringify(loginData));
        }

        toast.success("Account details updated successfully", { position: "bottom-right" });
        setIsEditing({ UserName: false, Name: false, Email: false });
    } catch (error) {
        toast.error("Failed to update account details", { position: "bottom-right" });
    }
};

  return (
    <div className={styles["panel"]}>
      <h2 style={{ color: "white" }}>Account Details</h2>
      
      {["UserName", "Name", "Email"].map((field) => (
        <TextField
          key={field}
          label={field}
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
                <CustomButton 
                  displayIcon={isEditing[field] ? <SaveIcon /> : <EditIcon />} 
                  onClick={() => isEditing[field] ? handleSave() : toggleEdit(field)} 
                />
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
            "& .MuiInputLabel-root": { color: "#ffffff !important" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#ffffff" },
            "& .MuiOutlinedInput-root.Mui-disabled": {
      "& input": {
        color: "#ffffff", 
        WebkitTextFillColor: "#ffffff",

      },
    },
          }}
        />
      ))}

      {(isEditing.UserName || isEditing.Name || isEditing.Email) && (
        <CustomButton
          onClick={handleSave}
          displayValue={"Save"}
          displayIcon={<SaveIcon />}
        />
      )}
    </div>
  );
};

export default EmployeeAccountDetails;
