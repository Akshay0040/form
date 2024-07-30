// src/Form.js
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Form = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    designation: '',
    department: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Employee Details', 10, 10);
    doc.text(`Title: ${formData.title}`, 10, 20);
    doc.text(`First Name: ${formData.firstName}`, 10, 30);
    doc.text(`Last Name: ${formData.lastName}`, 10, 40);
    doc.text(`Designation: ${formData.designation}`, 10, 50);
    doc.text(`Department: ${formData.department}`, 10, 60);
    doc.text(`Start Date: ${formData.startDate}`, 10, 70);
    doc.text(`End Date: ${formData.endDate}`, 10, 80);
    doc.save('employee-details.pdf');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('employeeData', JSON.stringify(formData));
    generatePDF();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <select name="title" value={formData.title} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Designation:
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Department:
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Save & Generate PDF</button>
    </form>
  );
};

export default Form;
