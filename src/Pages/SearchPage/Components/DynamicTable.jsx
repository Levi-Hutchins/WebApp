import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PopUpModal from "../../../shared-components/Modal/Modal";
import CustomButton from "../../../shared-components/Button/CustomButton";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/Cart/CartSlice";

// item table component 
export default function ItemsTable({ data, }) {

  // states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); 
  const dispatch = useDispatch(); // redux dispatch function for cart
  
  // opens modal for clicked item
  const handleOpen = (row) => {
    setSelectedRow(row);
    setModalOpen(true); 
  };

  // closes modal
  const handleClose = () => setModalOpen(false);

  // changes page 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handles row change pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // adds the item into the cart
  const handleCartAdd = (event, value) => {
    event.stopPropagation(); // Prevents modal opening on button click
    dispatch(addToCart(value))

  };

  // table colums
  const columns = [{ id: "Name", label: "Product Name", minWidth: 170 }];

  return (
    <>
      {/* Table container for displaying items */}
      <Paper sx={{ width: "700px", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="center" sx={{ fontWeight: 'bold', minWidth: 50 }}>
                  Add to Cart
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    const value = row.Name || "Unnamed";

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.ID || rowIndex}
                        onClick={() => handleOpen(row)} 
                      >
                        <TableCell key={row.ID || rowIndex} align="left">
                          {value !== undefined ? value : "-"}
                        </TableCell>
                        <TableCell align="right">
                          <div className="right-align">
                            <CustomButton 
                              className="custom-button" 
                              displayIcon={<AddShoppingCartIcon/>} 
                              onClick={(event) => handleCartAdd(event, row)} 
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    No Results Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      <PopUpModal 
        open={modalOpen} 
        onClose={handleClose}
        productTitle={selectedRow ? selectedRow.Name : null}
        productDetails={selectedRow ? selectedRow : "No Data Found"}
      />
    </>
  );
}
