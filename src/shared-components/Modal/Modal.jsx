import { React } from "react";
import { Modal, Box, Typography } from "@mui/material";
import "./Modal.css";
// re-usable MUI modal with props didnt really end up using much aside from search page
const PopUpModal = ({ open, onClose, productTitle, productDetails }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <Typography
          variant="h6"
          component="h2"
          color={"#5e43f3"}
          fontWeight={"bold"}
        >
          {productTitle}
        </Typography>
        <Typography sx={{ mt: 2, color: "black" }}>
          {productDetails.Description}
        </Typography>
      </Box>
    </Modal>
  );
};

export default PopUpModal;
