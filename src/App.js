import React, { useState, useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import CompanyForm from './components/CompanyForm';
import CompanyTable from './components/CompanyTable';
import { Box, Button, Tabs, Tab } from '@mui/material';
import ImageUpload from './components/ImageUpload';
import DisplayImage from './components/DisplayImage';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);

    const storedCompanies = JSON.parse(localStorage.getItem('companies')) || [];
    setCompanies(storedCompanies);
  }, []);

  const handleSaveEmployee = (employeeData) => {
    const updatedEmployees = employees.some(emp => emp.id === employeeData.id)
      ? employees.map(emp => emp.id === employeeData.id ? employeeData : emp)
      : [...employees, employeeData];

    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setEditingEmployee(null);
    setShowEmployeeForm(false);
  };

  const handleSaveCompany = (companyData) => {
    const updatedCompanies = companies.some(comp => comp.id === companyData.id)
      ? companies.map(comp => comp.id === companyData.id ? companyData : comp)
      : [...companies, companyData];

    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    setEditingCompany(null);
    setShowCompanyForm(false);
  };

  const handleCancelEmployee = () => {
    setEditingEmployee(null);
    setShowEmployeeForm(false);
  };

  const handleCancelCompany = () => {
    setEditingCompany(null);
    setShowCompanyForm(false);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowEmployeeForm(true);
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setShowCompanyForm(true);
  };

  const handleDeleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const handleDeleteCompany = (companyId) => {
    const updatedCompanies = companies.filter(company => company.id !== companyId);
    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box padding={3}>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs">
        <Tab label="Employees" />
        <Tab label="Companies" />
      </Tabs>
      <Box marginBottom={2} />
      {tabValue === 0 && (
        <>
          {!showEmployeeForm && (
            <Box marginBottom={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setEditingEmployee(null);
                  setShowEmployeeForm(true);
                }}
              >
                Add New Employee
              </Button>
            </Box>
          )}
          {showEmployeeForm ? (
            <EmployeeForm employee={editingEmployee} onSave={handleSaveEmployee} onCancel={handleCancelEmployee} />
          ) : (
            <EmployeeTable onEdit={handleEditEmployee} onDelete={handleDeleteEmployee} />
          )}
        </>
      )}

      {tabValue === 1 && (
        <>
          {!showCompanyForm && (
            <Box marginBottom={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setEditingCompany(null);
                  setShowCompanyForm(true);
                }}
              >
                Add New Company
              </Button>
            </Box>
          )}
          {showCompanyForm ? (
            <CompanyForm company={editingCompany} onSave={handleSaveCompany} onCancel={handleCancelCompany} />
          ) : (
            <CompanyTable onEdit={handleEditCompany} onDelete={handleDeleteCompany} />
          )}
        </>
      )}
    </Box>
    // <>
    // <ImageUpload />
    // <DisplayImage />
    // </>
  );
};

export default App;
