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
import ViewProductModal from "./Modals/ViewProductModal";
import axios from "axios";
import TextField from "@mui/material/TextField";

export default function InventoryPage({ loggedInUser }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [productDescription, setProductDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/db/data/v1/inft3050/Stocktake",
          {
            headers: {
              "xc-token": process.env.REACT_APP_APIKEY,
            },
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

  const handleOpen = async (row) => {
    setSelectedRow(row);
    setModalOpen(true);

    try {
      const ProductResponse = await axios.get(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/Product/${row.id}`,
        {
          headers: {
            "xc-token": process.env.REACT_APP_APIKEY,
          },
        }
      );
      setProductDescription(ProductResponse.data.Description);
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
    setPage(0);
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
      <Paper
        sx={{
          backgroundColor: "#28293d",
          color: "white",
          width: "80%",
          margin: "40px auto",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <TextField
          label="Search Inventory"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by product name, format, price, or quantity"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#1c1c2b",
              color: "white",
              "& fieldset": {
                borderColor: "#5e43f3",
              },
              "&:hover fieldset": {
                borderColor: "#5a54e0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6c63ff",
              },
            },
            input: {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: "#aaa",
            },
          }}
        />

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="inventory table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: column.minWidth }}
                    sx={{
                      backgroundColor: "#1c1c2b",
                      color: "#6c63ff",
                      fontWeight: "bold",
                    }}
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
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`${row.id}-${row.format}`}
                      onClick={() => handleOpen(row)}
                      sx={{
                        backgroundColor: "#1c1c2b",
                        "&:hover": {
                          backgroundColor: "#323247",
                        },
                      }}
                    >
                      <TableCell align="left" sx={{ color: "white" }}>
                        {row.name}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "white" }}>
                        {row.format}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "white" }}>
                        {row.quantity}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "white" }}>
                        {"$" + row.price}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
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
          sx={{
            backgroundColor: "#28293d",
            color: "white",
            "& .MuiSelect-icon": {
              color: "white",
            },
            "& .MuiInputBase-root": {
              color: "white",
            },
          }}
        />
      </Paper>

      <ViewProductModal
        open={modalOpen}
        onClose={handleClose}
        productTitle={selectedRow ? selectedRow.name : ""}
        productDetails={{
          ID: selectedRow ? selectedRow.id : "",
          Description: productDescription || "Loading...",
          Quantity: selectedRow ? selectedRow.quantity : "N/A",
          Price: selectedRow ? `$${selectedRow.price}` : "N/A",
        }}
      />
    </>
  );
}
