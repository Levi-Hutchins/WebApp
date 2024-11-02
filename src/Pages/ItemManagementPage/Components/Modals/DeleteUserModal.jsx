import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import Button from '@mui/material/Button';
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../Styles/Modals.module.css";

const DeleteUserModal = ({ open, onClose, user, onDeleteConfirm }) => {
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
          Confirm Delete
        </Typography>
        <Typography color="white" mb={3}>
          Are you sure you want to delete user <strong>{user?.Name}</strong>?
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Button
            displayValue="Cancel"
            onClick={onClose}
            sx={{ backgroundColor: "gray", color: "white" }}
          >Cancel</Button>
          <Button
            displayValue="Confirm"
            onClick={() => onDeleteConfirm(user)}
            sx={{ backgroundColor: "red", color: "white", marginLeft: "10px"}}
          >Confirm</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteUserModal;
