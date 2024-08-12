import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, Menu, MenuItem, Snackbar, Alert } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CompanyTable = ({ onEdit, onDelete }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuCompany, setMenuCompany] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });
  const [logoUrls, setLogoUrls] = useState({}); // Store logo URLs for cleanup

  useEffect(() => {
    // Fetch companies from localStorage
    const storedCompanies = JSON.parse(localStorage.getItem('companies')) || [];
    setCompanies(storedCompanies);

    // Load the selected company from localStorage
    const savedCompany = JSON.parse(localStorage.getItem('selectedCompany'));
    if (savedCompany) {
      setSelectedCompany(savedCompany);
    }

    // Clean up any previously created URLs
    Object.values(logoUrls).forEach((url) => URL.revokeObjectURL(url));

  }, [logoUrls]); // Dependency array to trigger cleanup when URLs change

  const handleCheckboxChange = (company) => {
    const newSelectedCompany = selectedCompany && selectedCompany.id === company.id ? null : company;

    // Update state
    setSelectedCompany(newSelectedCompany);

    // Save to localStorage
    if (newSelectedCompany) {
      localStorage.setItem('selectedCompany', JSON.stringify(newSelectedCompany));
    } else {
      localStorage.removeItem('selectedCompany');
    }
  };

  const handleMenuOpen = (event, company) => {
    setAnchorEl(event.currentTarget);
    setMenuCompany(company);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuCompany(null);
  };

  const handleEdit = () => {
    onEdit(menuCompany);
    handleMenuClose();
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: '', severity: '' });
  };

  // Function to get logo src and manage object URLs
  const getLogoSrc = (logo) => {
    if (logo && typeof logo === 'string') {
      // Assume it's a URL or base64 string
      return logo;
    } else if (logo && typeof logo === 'object' && logo instanceof File) {
      const url = URL.createObjectURL(logo);
      setLogoUrls((prevUrls) => ({ ...prevUrls, [logo.name]: url }));
      return url;
    }
    return null;
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => {
              const logoSrc = getLogoSrc(company.logo);

              return (
                <TableRow key={company.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCompany && selectedCompany.id === company.id}
                      onChange={() => handleCheckboxChange(company)}
                    />
                  </TableCell>
                  <TableCell>
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={company.companyName}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    ) : (
                      <span>No Logo</span>
                    )}
                  </TableCell>
                  <TableCell>{company.companyName}</TableCell>
                  <TableCell>{company.email}</TableCell>
                  <TableCell>{company.website}</TableCell>
                  <TableCell>{company.location}</TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handleMenuOpen(event, company)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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

export default CompanyTable;
