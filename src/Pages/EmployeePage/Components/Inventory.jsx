import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PopUpModal from "../../../shared-components/Modal/Modal";
import axios from "axios";
import TextField from "@mui/material/TextField"; 

export default function InventoryPage({ loggedInUser }) {
  const [data, setData] = useState([]); // Holds inventory data
  const [filteredData, setFilteredData] = useState([]); // For search results
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // Selected item for modal
  const [productDescription, setProductDescription] = useState(""); // Store description
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch inventory data from backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/db/data/v1/inft3050/Stocktake",
          {
            headers: {
              "xc-token": process.env.REACT_APP_APIKEY,
            }
          }
        );

        const productList = response.data.list.map((item) => ({
          id: item.Product.ID,
          name: item.Product.Name,
          price: item.Price,
          quantity: item.Quantity,
          format: item.Source.SourceName,
        }));

        setData(productList);
        setFilteredData(productList);
      } catch (err) {
        setError("Failed to fetch inventory data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [loggedInUser]);

    // Function to handle opening the modal and fetching description
    const handleOpen = async (row) => {
        setSelectedRow(row);
        setModalOpen(true);

        console.log(row.id)

        try {
        const ProductResponse = await axios.get(
            `http://localhost:8080/api/v1/db/data/v1/inft3050/Product/${row.id}`, // Fetch product description
            {
            headers: {
                "xc-token": process.env.REACT_APP_APIKEY,
            },
            }
        );

        // Assuming the response contains a 'description' field
        setProductDescription(ProductResponse.data.description);
        } catch (err) {
        console.error("Failed to fetch product description", err);
        setProductDescription("No description available.");
        }
    };

  const handleClose = () => setModalOpen(false);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(query) ||
      item.format.toLowerCase().includes(query) ||
      String(item.price).includes(query) ||
      String(item.quantity).includes(query)
    );
    setFilteredData(filtered);
    setPage(0); // Reset to first page on new search
  };

  const columns = [
    { id: "name", label: "Product Name", minWidth: 120 },
    { id: "format", label: "Format", minWidth: 100 },
    { id: "quantity", label: "Quantity", minWidth: 100 },
    { id: "price", label: "Price ($)", minWidth: 100 },
    
  ];

  if (loading) return <p>Loading inventory data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Paper sx={{ width: "40%", overflow: "hidden", margin: "auto" }}>

      <TextField
          label="Search Inventory"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by product name, format, price, or quantity"
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
              {filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`${row.id}-${row.format}`} // Ensures unique keys
                      onClick={() => handleOpen(row)}
                    >
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.format}</TableCell>
                      <TableCell align="left">{row.quantity}</TableCell>
                      <TableCell align="left">{"$" + row.price}</TableCell>
                    </TableRow>
                  ))
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
        productTitle={selectedRow ? selectedRow.name : ""}
        productDetails={{
            ID: selectedRow ? selectedRow.id : "",
            Description: productDescription ? productDescription : "Loading...",
            Quantity: selectedRow ? selectedRow.quantity : "N/A",
            Price: selectedRow ? `$${selectedRow.price}` : "N/A",
        }}
        />
    </>
  );
}
