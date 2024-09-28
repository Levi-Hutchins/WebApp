import {React} from 'react';
import { Modal, Box, Typography } from '@mui/material';
import '../../Styles/AddItemModal.module.css';  

const DeleteItemModal = ({ open, onClose, }) => {

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">  
        <Typography variant="h6" component="h2" color={"#5e43f3"} fontWeight={"bold"}>
          Delete an Item
        </Typography>

      </Box>
    </Modal>
  );
};

export default DeleteItemModal;
