import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// TODO: Figure ouit how to query the orders

const columns = [
  { id: 'productName', label: 'Product Name', minWidth: 170 },
  { id: 'quantity', label: 'Quantity', minWidth: 100 },
  {
    id: 'price',
    label: 'Price ($)',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(productName, quantity, price) {
  return { productName, quantity, price };
}

const rows = [
  createData('Product 1', 50, 19.99),
  createData('Product 2', 120, 45.5),
  createData('Product 3', 30, 12.99),
  createData('Product 4', 200, 89.75),
  createData('Product 5', 150, 22.39),
  createData('Product 6', 75, 55.0),
  createData('Product 7', 60, 9.99),
  createData('Product 8', 90, 33.45),
  createData('Product 9', 100, 29.99),
  createData('Product 10', 80, 67.89),
];

export default function OrdersTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper 
      sx={{ 
        width: "100%", 
        maxWidth: "600px", 
        backgroundColor: "#2c2c32",  
        color: "#fff",  
        borderRadius: "16px", 
        overflow: "hidden", 
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", 
      }}
      elevation={4}
    >
      <TableContainer 
        sx={{ 
          maxHeight: 440, 
          backgroundColor: "#2c2c32",  
          color: "#fff",  
          borderRadius: "16px", 
          overflow: "auto", 
        }}
      >
        <Table stickyHeader aria-label="sticky table" sx={{borderCollapse: 'collapse',
    '& .MuiTableCell-root': {
      borderBottom: '1px solid #454545'}}}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ 
                    top: 0, 
                    minWidth: column.minWidth, 
                    backgroundColor: '#2c2c32', 
                    color: 'white',  
                    zIndex: 1000,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.productName}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} sx={{ color: '#fff' }}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ backgroundColor: "#2c2c32", color: "#fff" }}  
      />
    </Paper>
  );
}
