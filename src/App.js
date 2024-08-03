import React, { useState } from 'react';
import { Container, Typography, Button, Modal, Box, Snackbar } from '@mui/material';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm from './components/EmployeeForm';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showNotification = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleAdd = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
    setIsModalOpen(false);
    showNotification('Employee added successfully');
  };

  const handleEdit = (updatedEmployee) => {
    setEmployees(employees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee)));
    setIsModalOpen(false);
    showNotification('Employee updated successfully');
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const openModal = (employee = null) => {
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEmployee(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => openModal()}>
        Add Employee
      </Button>
      <EmployeeTable employees={employees} onEdit={openModal} onDelete={handleDelete} showNotification={showNotification} />
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', maxWidth: '500px' }}>
          <EmployeeForm
            employee={currentEmployee}
            onSave={(employee) => (currentEmployee ? handleEdit(employee) : handleAdd(employee))}
            onCancel={closeModal}
          />
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default App;
