import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Button, Box, Snackbar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EmployeeTable = ({ employees, onEdit, onDelete, showNotification }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleMenuOpen = (event, employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const handleEdit = () => {
    onEdit(selectedEmployee);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(selectedEmployee.id);
    handleMenuClose();
    showNotification('Employee deleted successfully');
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Employee Details', 20, 10);
    const tableColumn = ["Title", "First Name", "Last Name", "Designation", "Department", "Start Date", "End Date"];
    const tableRows = [];

    employees.forEach(employee => {
      const employeeData = [
        employee.title,
        employee.firstName,
        employee.lastName,
        employee.designation,
        employee.department,
        employee.startDate,
        employee.endDate,
      ];
      tableRows.push(employeeData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('employee-details.pdf');
    showNotification('PDF generated successfully');
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.title}</TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.startDate}</TableCell>
                <TableCell>{employee.endDate}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuOpen(event, employee)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={generatePDF}>
          Generate PDF
        </Button>
      </Box>
    </div>
  );
};

export default EmployeeTable;
