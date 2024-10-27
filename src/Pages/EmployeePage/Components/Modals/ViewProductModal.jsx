import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import './../../Styles/ViewProductModal.css'


const ViewProductModal = ({ open, onClose, productTitle, productDetails }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" component="h2" fontWeight="bold" color="#5e43f3">
          {productTitle}
        </Typography>

        <Typography sx={{ mt: 2, fontSize: "1.1rem", color: "black" }}>
          <strong>ID:</strong> {productDetails.ID}
        </Typography>

        <Typography sx={{ mt: 2, fontSize: "1.1rem", color: "black" }}>
          <strong>Description:</strong> {productDetails.Description}
        </Typography>

        <Typography sx={{ mt: 2, fontSize: "1.1rem", color: "black" }}>
          <strong>Quantity:</strong> {productDetails.Quantity}
        </Typography>

        <Typography sx={{ mt: 2, fontSize: "1.1rem", color: "black" }}>
          <strong>Price:</strong> {productDetails.Price}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ViewProductModal;
