import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import './../../Styles/ViewProductModal.css'

// Modal component to display the product information inside Employee page
const ViewProductModal = ({ open, onClose, productTitle, productDetails }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        {/* Close button */}
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: "absolute", top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>

        {/* Product name */}
        <Typography variant="h4" component="h2" fontWeight="bold" color="#5e43f3">
          {productTitle}
        </Typography>

        {/* Product ID */}
        <Typography sx={{ mt: 2, fontSize: "1.1rem", color: "black" }}>
          <strong>ID:</strong> {productDetails.ID}
        </Typography>

        {/* Product description */}
        <Typography sx={{ mt: 2, fontSize: "1.1rem", color: "black" }}>
          <strong>Description:</strong> {productDetails.Description}
        </Typography>

        {/* Quantitity of product left */}
        <Typography sx={{ mt: 2, fontSize: "1.1rem", color: "black" }}>
          <strong>Quantity:</strong> {productDetails.Quantity}
        </Typography>

        {/* Price of product */}
        <Typography sx={{ mt: 2, fontSize: "1.1rem", color: "black" }}>
          <strong>Price:</strong> {productDetails.Price}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ViewProductModal;
