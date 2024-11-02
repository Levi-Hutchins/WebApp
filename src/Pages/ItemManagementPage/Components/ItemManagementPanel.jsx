import { React, useState } from "react";
import styles from "../Styles/ItemManagementPanel.module.css";
import CustomButton from "../../../shared-components/Button/CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddItemModal from "./Modals/AddItemModel";
import EditItemModal from "./Modals/EditItemModal";
import DeleteItemModal from "./Modals/DeleteItemModal";
const ItemManagementPanel = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleClose = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  };
  return (
    <div className={styles["panel"]}>
      <h1>Item Management</h1>
      <div className={styles["add-button"]}>
        <CustomButton
          displayValue={"Add an Item"}
          displayIcon={<AddCircleIcon />}
          onClick={() => setAddModalOpen(true)}
        />
      </div>
      <div className={styles["edit-button"]}>
        <CustomButton
          displayValue={"Edit an Item"}
          displayIcon={<EditNoteIcon />}
          onClick={() => setEditModalOpen(true)}
        />
      </div>
      <div className={styles["delete-button"]}>
        <CustomButton
          displayValue={"Delete an Item"}
          displayIcon={<DeleteIcon />}
          onClick={() => setDeleteModalOpen(true)}
        />
      </div>

      <AddItemModal onClose={handleClose} open={addModalOpen} />
      <EditItemModal onClose={handleClose} open={editModalOpen} />
      <DeleteItemModal onClose={handleClose} open={deleteModalOpen} />
    </div>
  );
};

export default ItemManagementPanel;
