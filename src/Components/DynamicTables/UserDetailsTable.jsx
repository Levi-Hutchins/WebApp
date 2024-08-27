import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SaveIcon from '@mui/icons-material/Save';
import CustomButton from "../Button/CustomButton";
import { toast } from "react-toastify";
import validateUpdatedDetails from "../../Utils/Validation/UpdateDetailsValidation"

function createData(accountValue, value) {
  return { accountValue, value };
}

const initialRows = [
  createData("Full Name", "John Doe"),
  createData("Email Address", "test@gmail.com"),
  createData("Phone Number", "0423238791"),
  createData("Street Address", "corner stree"),
  createData("Password", "********"),
];

const UserDetailsTable = () => {
  const [rows, setRows] = useState(initialRows);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [errors, setErrors] = useState({})

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
    const validationErrors = validateUpdatedDetails(updatedRows, editRowIndex);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setRows(updatedRows); 
      setEditRowIndex(null); 
      toast.success("Details Updated !",{
        position: "bottom-right"
      });
    }
    toast.error("Please correct highlighted fields",{
      position: "bottom-right"
    })

  };

  return (
    <TableContainer component={Paper} sx={{width: 700}}>
      <Table sx={{ width: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Account Values</TableCell>
            <TableCell align="left">Value</TableCell>
            <TableCell align="right">Edit Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.accountValue}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.accountValue}
              </TableCell>

              {editRowIndex === index ? (
                <TableCell align="left">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      id="outlined-basic"
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
            borderColor: errors[editRowIndex] ? "red" : "#454545",
          }
                       
                      }}
                    />
                    <Box sx={{ ml: 1 }}>
                      <CustomButton onClick={handleSaveClick} displayIcon={<SaveIcon/>} />
                    </Box>
                  </Box>
                </TableCell>
              ) : (
                <TableCell align="left">{row.value}</TableCell>
              )}

              <TableCell align="right">
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
  );
};

export default UserDetailsTable;
