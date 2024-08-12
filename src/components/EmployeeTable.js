import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, Menu, MenuItem, Button, Box, Snackbar, Alert } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EmployeeTable = ({ onEdit }) => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuEmployee, setMenuEmployee] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    // Fetch data from local storage
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleCheckboxChange = (employee) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(employee)
        ? prevSelected.filter((e) => e !== employee)
        : [...prevSelected, employee]
    );
  };

  const handleMenuOpen = (event, employee) => {
    setAnchorEl(event.currentTarget);
    setMenuEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuEmployee(null);
  };

  const handleEdit = () => {
    onEdit(menuEmployee);
    handleMenuClose();
  };

  const handleDelete = (employeeId) => {
    const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    handleMenuClose();
    showNotification('Employee deleted successfully', 'success');
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: '', severity: '' });
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany')) || {};
  const companyLogo = selectedCompany.logo || '/default-logo.png'; // Fallback logo if not selected

  const generatePDF = (employee) => {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = companyLogo; // Use the logo from the selected company
    
    logo.onload = () => {
      doc.addImage(logo, 'PNG', 10, 10, 60, 30); // Add logo to PDF
      doc.setFontSize(14);
      doc.text(selectedCompany.companyName || 'Company Name', 10, 50);
      doc.text(selectedCompany.location || 'Location', 10, 60);
      doc.text(selectedCompany.website || 'Website', 10, 70);
      doc.text(selectedCompany.email || 'Email', 10, 80);

      doc.setFontSize(12);
      doc.text(new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }), 10, 90);

      doc.text(`${employee.title} ${employee.firstName} ${employee.lastName}`, 10, 110);
      doc.text(`${employee.designation}`, 10, 120);
      doc.text('Noida, India.', 10, 130);

      doc.setFontSize(16);
      const text = 'TO WHOM IT MAY CONCERN';
      const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const pageWidth = doc.internal.pageSize.width;
      const x = (pageWidth - textWidth) / 2;
      doc.text(text, x, 150);

      doc.setFontSize(12);
      doc.text('Subject: Work experience certificate', 10, 170);

      const bodyText = `This is to certify that ${employee.firstName} ${employee.lastName} has worked as a ${employee.designation} with ${employee.organization} from ${formatDate(employee.startDate)} to ${formatDate(employee.endDate)}.
      
During his tenure, ${employee.firstName}'s services were found to be exceptional. He has shown strong technical skills, and problem-solving abilities and has been dedicated towards his work throughout.

${employee.firstName} has been an asset to the ${employee.department} team and has played a significant role in completing successful projects.

${employee.organization} wishes ${employee.firstName} the best in his future endeavors.

Sincerely,
Rakesh Maurya
Manager
abc123@gmail.com
9748563284`;

      doc.text(bodyText, 10, 190, { maxWidth: 180 });

      doc.save(`${employee.title} ${employee.firstName}_${employee.lastName}_experience_certificate.pdf`);
      showNotification('PDF generated successfully', 'success');
    };

    logo.onerror = () => {
      showNotification('Error loading company logo', 'error');
    };
  };

  const handleGeneratePDFs = () => {
    selectedEmployees.forEach((employee) => {
      generatePDF(employee);
    });
  };

  return (
    <div>
      {console.log(JSON.parse(localStorage.getItem('selectedCompany')))}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedEmployees.includes(employee)}
                    onChange={() => handleCheckboxChange(employee)}
                  />
                </TableCell>
                <TableCell>{employee.title}</TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.organization}</TableCell>
                <TableCell>{formatDate(employee.startDate)}</TableCell>
                <TableCell>{formatDate(employee.endDate)}</TableCell>
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
                    <MenuItem onClick={() => handleDelete(employee.id)}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleGeneratePDFs}
          disabled={selectedEmployees.length === 0}
        >
          Generate PDFs
        </Button>
      </Box>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EmployeeTable;
