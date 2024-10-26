import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import styles from '../Styles/UsersPanel.module.css';
import CustomButton from "../../../shared-components/Button/CustomButton";
import AddUserModal from "./Modals/AddUserModal";
import EditUserModal from "./Modals/EditUserModal"; // Import new modal
import useUsers from "../Hooks/useUsers";

const UsersPanel = () => {
  const [usersModalOpen, setUsersModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const { getAllUsers } = useUsers();
  
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
    </div>
  );
};

export default UsersPanel;
