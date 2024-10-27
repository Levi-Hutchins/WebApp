import React from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const ViewAccountModal = ({ open, onClose, customer }) => {
  if (!customer) return null; // Prevent modal from rendering if no customer is selected

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        {/* Close button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Customer Name */}
        <Typography variant="h4" component="h2" fontWeight="bold" color="#5e43f3">
          {customer.Name}
        </Typography>

        {/* Customer Details */}
        <Typography sx={{ mt: 2, fontSize: "1.1rem", color: "black" }}>
          <strong>Customer ID:</strong> {customer.UserID}
        </Typography>

        <Typography sx={{ mt: 2, fontSize: "1.1rem", color: "black" }}>
          <strong>Email:</strong> {customer.Email}
        </Typography>

        {/* View Orders button - not fucntional due to backend set up */}
        <Button 
            className="ViewOrders-button"
            variant="contained"
            onClick={() => toast.success("Taking you to the order page")}
            sx={{
               mt: 2,
              fontFamily: "Andale Mono, monospace",
              backgroundColor: "#5e43f3",
              "&:hover": {
                backgroundColor: "#4e3ac0",
                alignSelf: "center",
                
              },
            }}>
            View Customer Orders
        </Button>


      </Box>
    </Modal>
  );
};

export default ViewAccountModal;
