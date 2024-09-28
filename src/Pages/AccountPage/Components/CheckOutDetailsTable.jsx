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
import validateUpdatedDetails from "../../../Utils/Validation/AccountValidators/CheckoutDetailsValidation";
import useUpdateCustomerDetails from "../Hooks/useUpdateCustomerDetails"; 

function createData(accountValue, value) {
  return { accountValue, value };
}

const CheckOutDetailsTable = ({ customerValues }) => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (Object.keys(customerValues).length > 0) {
      setRows([
        createData("Email Address", customerValues.Email ?? ""),
        createData("Phone Number", customerValues.PhoneNumber ?? ""),
        createData("Street Address", customerValues.StreetAddress ?? ""),
        createData("Post Code", customerValues.PostCode ?? ""),
        createData("Suburb", customerValues.Suburb ?? ""),
        createData("State", customerValues.State ?? ""),
        createData("Card Owner", customerValues.CardOwner ?? ""),
        createData("Card Number", customerValues.CardNumber ?? ""),
        createData("Expiry Date", customerValues.Expiry ?? ""),
        createData("CVV", customerValues.CVV ?? ""),
      ]);
    }
  }, [customerValues]);

  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [errors, setErrors] = useState({});
  
  const { updateCheckoutDetails } = useUpdateCustomerDetails();

  const handleEditClick = (index) => {
    setEditRowIndex(index);
    setEditValue(rows[index].value);
  };

  const handleValueChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleSaveClick = async () => {
    const updatedRows = rows.map((row, index) =>
      index === editRowIndex ? { ...row, value: editValue } : row
    );
    const validationErrors = validateUpdatedDetails(updatedRows, editRowIndex);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await updateCheckoutDetails(updatedRows,customerValues.ID ); 
        setRows(updatedRows);
        setEditRowIndex(null);
        toast.success("Details Updated!", {
          position: "bottom-right",
        });
      } catch (err) {
        toast.error("Error updating details!", {
          position: "bottom-right",
        });
      }
    } else {
      toast.error("Please correct highlighted fields", {
        position: "bottom-right",
      });
    }
  };

  return (
    <Paper
      sx={{
        width: "500px",
        borderRadius: "16px",
        padding: "16px",
        backgroundColor: "#2c2c32", 
        color: "#fff", 
        maxHeight: "500px",
        overflowY: "auto",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "16px" }}>
        Checkout Details
      </h2>
      <TableContainer>
        <Table
          aria-label="user details table"
          sx={{
            '& .MuiTableCell-root': {
              borderBottom: '1px solid #454545', 
              color: '#fff',  
            },
          }}
        >
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
                          backgroundColor: "#2c2c32",
                          "& .MuiInputBase-root": {
                            height: "40px",
                            fontSize: "0.870rem",
                            color: "white",
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

export default CheckOutDetailsTable;
