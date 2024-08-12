import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Input } from '@mui/material';

const CompanyForm = ({ company, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    website: '',
    location: '',
    logo: null // Add field for the company logo
  });

  useEffect(() => {
    if (company) {
      setFormData(company);
    } else {
      setFormData({
        companyName: '',
        email: '',
        website: '',
        location: '',
        logo: null // Initialize logo as null
      });
    }
  }, [company]);

  // Function to convert image file to Base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const base64 = await getBase64(files[0]);
      setFormData((prevData) => ({
        ...prevData,
        [name]: base64
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const companyData = { ...formData, id: company ? company.id : Date.now() };
    onSave(companyData);
    // Optionally save to local storage
    localStorage.setItem('companyLogo', formData.logo);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        width={500}
        padding={3}
        boxShadow={3}
        bgcolor="background.paper"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              type="file"
              name="logo"
              onChange={handleChange}
              fullWidth
            />
            {formData.logo && <img src={formData.logo} alt="Company Logo" style={{ width: '100px', marginTop: '10px' }} />}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Company
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" fullWidth onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CompanyForm;
