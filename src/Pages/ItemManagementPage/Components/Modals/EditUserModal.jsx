import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, IconButton, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import styles from "../../Styles/Modals.module.css";
import CustomButton from "../../../../shared-components/Button/CustomButton";
import useUserMutations from "../../Hooks/useUserMutations";
import { toast } from "react-toastify";

const EditUserModal = ({ open, onClose, user }) => {
  const [previousID, setPreviousID] = useState("");
  const { updateUser } = useUserMutations();
  const [userDetails, setUserDetails] = useState({
    UserName: "",
    Email: "",
    Name: "",
    IsAdmin: "false",
  });

  const [isEditing, setIsEditing] = useState({
    UserName: false,
    Email: false,
    Name: false,
  });

  useEffect(() => {
    if (user) {
      // set initial user details from the provided user object
      setPreviousID(user.UserName);
      setUserDetails({
        UserName: user.UserName || "",
        Email: user.Email || "",
        Name: user.Name || "",
        IsAdmin: JSON.stringify(user.IsAdmin) || "false",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAdminChange = (e) => {
    // toggle admin status based on checkbox
    const { checked } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      IsAdmin: checked ? "true" : "false",
    }));
  };

  const toggleEdit = (field) => {
    // toggle editing mode for a specific field
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async () => {
    try {
      // update user details
      if (!(await updateUser(previousID, userDetails))) {
        toast.error("An Error Occured", { position: "bottom-right" });
      } else {
        toast.success("User Updated Successfully !", {
          position: "bottom-right",
        });
      }
    } catch (err) {
      toast.error("Error updating user", { position: "bottom-right" });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles["modal-box"]} sx={{ padding: "24px" }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="h2"
          color="white"
          fontWeight="bold"
          fontSize="24px"
          mb={3}
        >
          Edit User Details
        </Typography>

        {/* Editable fields for user details */}
        <Box mb={2}>
          <TextField
            label="UserName"
            name="UserName"
            value={userDetails.UserName}
            onChange={handleChange}
            disabled={!isEditing.UserName}
            fullWidth
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => toggleEdit("UserName")}
                  sx={{ color: "white" }}
                >
                  <EditIcon />
                </IconButton>
              ),
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#24242c",
                "& fieldset": { borderColor: "#454545" },
                "&:hover fieldset": { borderColor: "#454545" },
                "&.Mui-focused fieldset": { borderColor: "#5e43f3" },
                "& input": { color: "white", WebkitTextFillColor: "white" },
              },
            }}
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Email"
            name="Email"
            value={userDetails.Email}
            onChange={handleChange}
            disabled={!isEditing.Email}
            fullWidth
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => toggleEdit("Email")}
                  sx={{ color: "white" }}
                >
                  <EditIcon />
                </IconButton>
              ),
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#24242c",
                "& fieldset": { borderColor: "#454545" },
                "&:hover fieldset": { borderColor: "#454545" },
                "&.Mui-focused fieldset": { borderColor: "#5e43f3" },
                "& input": { color: "white", WebkitTextFillColor: "white" },
              },
            }}
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Name"
            name="Name"
            value={userDetails.Name}
            onChange={handleChange}
            disabled={!isEditing.Name}
            fullWidth
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => toggleEdit("Name")}
                  sx={{ color: "white" }}
                >
                  <EditIcon />
                </IconButton>
              ),
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#24242c",
                "& fieldset": { borderColor: "#454545" },
                "&:hover fieldset": { borderColor: "#454545" },
                "&.Mui-focused fieldset": { borderColor: "#5e43f3" },
                "& input": { color: "white", WebkitTextFillColor: "white" },
              },
            }}
          />
        </Box>

        {/* Checkbox for admin status */}
        <FormControlLabel
          control={
            <Checkbox
              checked={userDetails.IsAdmin === "true"}
              onChange={handleAdminChange}
              sx={{ color: "white", "&.Mui-checked": { color: "#5e43f3" } }}
            />
          }
          label="Change Admin Status"
          sx={{ mb: 3, color: "white" }}
        />

        {/* Save button */}
        <CustomButton
          displayValue="Save"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          displayIcon={<SaveIcon />}
        />
      </Box>
    </Modal>
  );
};

export default EditUserModal;
