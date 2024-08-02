// // src/App.js
// import React from 'react';
// import Form from './Form';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Employee Details Form</h1>
//       </header>
//       <Form />
//     </div>
//   );
// }

// export default App;




import React, { useState } from 'react';
import { Container, Typography, Button, Modal, Box } from '@mui/material';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm from './components/EmployeeForm';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const handleAdd = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
    setIsModalOpen(false);
  };

  const handleEdit = (updatedEmployee) => {
    setEmployees(employees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee)));
    setIsModalOpen(false);
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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => openModal()}>
        Add Employee
      </Button>
      <EmployeeTable employees={employees} onEdit={openModal} onDelete={handleDelete} />
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', maxWidth: '500px' }}>
          <EmployeeForm
            employee={currentEmployee}
            onSave={(employee) => (currentEmployee ? handleEdit(employee) : handleAdd(employee))}
            onCancel={closeModal}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default App;
