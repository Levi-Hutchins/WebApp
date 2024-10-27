import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, IconButton, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import styles from "../../Styles/Modals.module.css";
import CustomButton from "../../../../shared-components/Button/CustomButton";
import useValidation from "../../Hooks/useValidation";
import useUsers from "../../Hooks/useUsers";
import useUserMutations from "../../Hooks/useUserMutations";
import { toast } from "react-toastify";

const EditUserModal = ({ open, onClose, user }) => {
  const { validateAddUser } = useValidation();
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
      setPreviousID(user.UserName);
      console.log(user);
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
    const { checked } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      IsAdmin: checked ? "true" : "false", // Set as string "true" or "false"
    }));
  };

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async () => {
    try {
      if (!(await updateUser(previousID, userDetails))) {
        toast.error("An Error Occured", {
          position: "bottom-right",
        });
      } else {
        toast.success("User Updated Successfully !", {
          position: "bottom-right",
        });
      }
    } catch (err) {
      toast.error("Error updating user", {
        position: "bottom-right",
      });
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
          color={"white"}
          fontWeight={"bold"}
          fontSize={"24px"}
          mb={3}
        >
          Edit User Details
        </Typography>

        <Box mb={2}>
          <TextField
            label="UserName"
            name="UserName"
            value={userDetails.UserName}
            onChange={handleChange}
            disabled={!isEditing.UserName}
            fullWidth
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => toggleEdit("UserName")}
                  sx={{ color: "white" }}
                >
                  <EditIcon />
                </IconButton>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#24242c",
                "& fieldset": {
                  borderColor: "#454545",
                },
                "&:hover fieldset": {
                  borderColor: "#454545",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5e43f3",
                },
                "& input": {
                  color: "white",
                },
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
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
              endAdornment: (
                <IconButton
                  onClick={() => toggleEdit("Email")}
                  sx={{ color: "white" }}
                >
                  <EditIcon />
                </IconButton>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#24242c",
                "& fieldset": {
                  borderColor: "#454545",
                },
                "&:hover fieldset": {
                  borderColor: "#454545",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5e43f3",
                },
                "& input": {
                  color: "white",
                },
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
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },

              endAdornment: (
                <IconButton
                  onClick={() => toggleEdit("Name")}
                  sx={{ color: "white" }}
                >
                  <EditIcon />
                </IconButton>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#24242c",
                "& fieldset": {
                  borderColor: "#454545",
                },
                "&:hover fieldset": {
                  borderColor: "#454545",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5e43f3",
                },
                "& input": {
                  color: "white",
                },
              },
            }}
          />
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={userDetails.IsAdmin === "true"} // Interpret "true" as checked
              onChange={handleAdminChange}
            />
          }
          label="Change Admin Status"
          sx={{ mb: 3, color: "white" }}
        />

        <CustomButton
          displayValue={"Save"}
          onClick={handleSubmit}
          sx={{ mt: 2 }}
          displayIcon={<SaveIcon />}
        />
      </Box>
    </Modal>
  );
};

export default EditUserModal;
