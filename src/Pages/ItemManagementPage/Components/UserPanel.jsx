import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '../Styles/UsersPanel.module.css';
import CustomButton from "../../../shared-components/Button/CustomButton"
import AddUserModal from "./Modals/AddUserModal";
import EditUserModal from "./Modals/EditUserModal";
import DeleteUserModal from "./Modals/DeleteUserModal"; // Import delete modal
import useUsers from "../Hooks/useUsers";
import { toast } from "react-toastify";
import useUserMutations from "../Hooks/useUserMutations";

const UsersPanel = () => {
  const [usersModalOpen, setUsersModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State for delete modal
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const { getAllUsers } = useUsers(); // assuming deleteUser is defined in useUsers
  const {deleteUser}= useUserMutations();
  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData.list);
    };
    fetchUsers();
  }, [getAllUsers]);

  const handleCloseAddUser = () => {
    setUsersModalOpen(false);
  };

  const handleCloseEditUser = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user); 
    setEditModalOpen(true); 
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user); 
    setDeleteModalOpen(true); // Open delete confirmation modal
  };

  const handleDeleteConfirm = async (user) => {
    try {
      await deleteUser(user.UserName);
      toast.success("User deleted successfully!", { position: "bottom-right" });
      setUsers(users.filter((u) => u.UserName !== user.UserName)); // Update users list
      setDeleteModalOpen(false);
    } catch (err) {
      toast.error("Error deleting user", { position: "bottom-right" });
    }
  };

  return (
    <div className={styles["panel"]}>
      <h2 className={styles["users-title"]}>Users</h2>
      <div className={styles["users-list"]}>
        {users.map(user => (
          <div key={user.UserName} className={styles["user-item"]}>
            <PersonIcon className={styles["user-icon"]} />
            <span className={styles["user-name"]}>{user.Name}</span>
            <EditIcon 
              className={styles["edit-icon"]} 
              onClick={() => handleEditUser(user)} 
            />
            <DeleteIcon 
              className={styles["delete-icon"]} 
              onClick={() => handleDeleteUser(user)}
              sx={{ color: "#DA2727" }} 
            />
          </div>
        ))}
      </div>
      <CustomButton 
        displayValue={"Add New User"} 
        displayIcon={<PersonAddAltIcon />} 
        className={styles["add-button"]} 
        onClick={() => setUsersModalOpen(true)} 
      />
      <AddUserModal 
        open={usersModalOpen} 
        onClose={handleCloseAddUser} 
      />
      <EditUserModal 
        open={editModalOpen} 
        onClose={handleCloseEditUser} 
        user={selectedUser} 
      />
      <DeleteUserModal 
        open={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        user={selectedUser} 
        onDeleteConfirm={handleDeleteConfirm} 
      />
    </div>
  );
};

export default UsersPanel;
