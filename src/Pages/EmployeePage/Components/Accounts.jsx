import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import PopUpModal from "../../../shared-components/Modal/Modal"; // Modal for Customer Details

export default function CustomerAccounts() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customers data on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons", 
          {
            headers: { "xc-token": process.env.REACT_APP_APIKEY },
          }
        );
        setCustomers(response.data.list);
        setFilteredCustomers(response.data.list);
      } catch (err) {
        console.error("Failed to fetch customers data", err);
        setError("Failed to fetch customers data");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = customers.filter((customer) =>
      customer.Name.toLowerCase().includes(query) ||
      customer.Email.toLowerCase().includes(query)
    );
    setFilteredCustomers(filtered);
    setPage(0); // Reset pagination on search
  };

  // Fetch customer's orders when a customer row is clicked
  const handleOpen = async (customer) => {
    setSelectedCustomer(customer);
    setModalOpen(true);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/Orders/${customer.UserID}/orders`, // Retrieve orders for the customer
        {
          headers: { "xc-token": process.env.REACT_APP_APIKEY },
        }
      );
      setOrderDetails(response.data.list);
    } catch (err) {
      console.error("Failed to fetch customer orders", err);
      setOrderDetails([]);
    }
  };

  const handleClose = () => setModalOpen(false);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "Name", label: "Customer Name", minWidth: 140 },
    { id: "Email", label: "Email", minWidth: 140 },
  ];

  if (loading) return <p>Loading customer data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Paper sx={{ width: "20%", overflow: "hidden", margin: "auto" }}>
        <TextField
          label="Search Customers"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name or email"
        />

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: column.minWidth }}
                    sx={{ fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((customer) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={customer.UserID}
                      onClick={() => handleOpen(customer)}
                    >
                      <TableCell align="left">{customer.Name}</TableCell>
                      <TableCell align="left">{customer.Email}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No Customers Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={customers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <PopUpModal
        open={modalOpen}
        onClose={handleClose}
        productTitle={selectedCustomer ? selectedCustomer.Name : ""}
        productDetails={{
          Email: selectedCustomer ? selectedCustomer.Email : "N/A",
          Orders: orderDetails.length
            ? orderDetails.map((order) => (
                <p key={order.orderID}>
                  Order ID: {order.orderID} - {order.StreetAddress}, {order.Suburb}, {order.State}
                </p>
              ))
            : "No Orders Found",
        }}
      />
    </>
  );
}
