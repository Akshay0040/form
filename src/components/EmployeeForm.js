import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, MenuItem, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    designation: '',
    department: '',
    organization: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({
        title: '',
        firstName: '',
        lastName: '',
        designation: '',
        department: '',
        organization: '',
        startDate: '',
        endDate: ''
      });
    }
  }, [employee]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = { ...formData, id: employee ? employee.id : Date.now() };

    onSave(employeeData);
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
            <Box display="flex" alignItems="center">
              <TextField
                select
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Mr">Mr.</MenuItem>
                <MenuItem value="Mrs">Mrs.</MenuItem>
                <MenuItem value="Ms">Ms.</MenuItem>
              </TextField>
              {employee && (
                <CheckCircleIcon style={{ color: 'green', marginLeft: 8 }} />
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Employee
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

export default EmployeeForm;
