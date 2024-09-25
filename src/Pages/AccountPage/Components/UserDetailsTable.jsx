import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CustomButton from "../../../shared-components/Button/CustomButton";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CustomerDetailsValidator from "../../../Utils/Validation/AccountValidators/CustomerUpdate";
import EmployeeDetailsValidator from "../../../Utils/Validation/AccountValidators/EmployeeUpdate";

function createData(accountValue, value) {
  return { accountValue, value };
}

const UserDetailsTable = ({ userValues, isEmployee }) => {
  const [rows, setRows] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(userValues).length > 0) {
      if (isEmployee) {
        setRows([
          createData("UserName", userValues.UserName),
          createData("Email Address", userValues.Email),
          createData("Full Name", userValues.Name),
        ]);
      } else {
        setRows([
          createData("Full Name", userValues.Name),
          createData("Email Address", userValues.Email),
        ]);
      }
    }
  }, [userValues, isEmployee]);

  const handleEditClick = (index) => {
    setEditRowIndex(index);
    setEditValue(rows[index].value);
  };

  const handleValueChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleSaveClick = () => {
    const updatedRows = rows.map((row, index) =>
      index === editRowIndex ? { ...row, value: editValue } : row
    );
    const validationErrors = isEmployee
      ? EmployeeDetailsValidator(updatedRows, editRowIndex)
      : CustomerDetailsValidator(updatedRows, editRowIndex);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setRows(updatedRows);
      setEditRowIndex(null);
      toast.success("Details Updated!", {
        position: "bottom-right",
      });
    } else {
      toast.error("Please correct highlighted fields", {
        position: "bottom-right",
      });
    }
  };

  if (rows.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Paper
      sx={{
        width: "500px",

        borderRadius: "16px",
        padding: "16px",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#000", marginBottom: "16px" }}>
        Account Values
      </h2>
      <TableContainer>
        <Table aria-label="employee details table">
          <TableHead>
            <TableRow>
              <TableCell>Account Values</TableCell>
              <TableCell>Value</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.accountValue}>
                <TableCell>{row.accountValue}</TableCell>

                {editRowIndex === index ? (
                  <TableCell align="center">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        variant="outlined"
                        value={editValue}
                        onChange={handleValueChange}
                        sx={{
                          width: "150px",
                          "& .MuiInputBase-root": {
                            height: "40px",
                            fontSize: "0.870rem",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: errors[editRowIndex]
                              ? "red"
                              : "#454545",
                          },
                        }}
                      />
                      <Box sx={{ ml: 1 }}>
                        <CustomButton
                          onClick={handleSaveClick}
                          displayIcon={<SaveIcon />}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                ) : (
                  <TableCell>{row.value}</TableCell>
                )}

                <TableCell align="center">
                  <CustomButton
                    onClick={() => handleEditClick(index)}
                    displayIcon={<ModeEditIcon />}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserDetailsTable;
