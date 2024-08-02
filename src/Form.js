// // src/Form.js
// import React, { useState } from 'react';
// import { TextField, Button, MenuItem, Container, Grid, Typography } from '@mui/material';
// import jsPDF from 'jspdf';

// const Form = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     firstName: '',
//     lastName: '',
//     designation: '',
//     department: '',
//     startDate: '',
//     endDate: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.text('Employee Details', 10, 10);
//     doc.text(`Title: ${formData.title}`, 10, 20);
//     doc.text(`First Name: ${formData.firstName}`, 10, 30);
//     doc.text(`Last Name: ${formData.lastName}`, 10, 40);
//     doc.text(`Designation: ${formData.designation}`, 10, 50);
//     doc.text(`Department: ${formData.department}`, 10, 60);
//     doc.text(`Start Date: ${formData.startDate}`, 10, 70);
//     doc.text(`End Date: ${formData.endDate}`, 10, 80);
//     doc.save('employee-details.pdf');
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     localStorage.setItem('employeeData', JSON.stringify(formData));
//     generatePDF();
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" component="h1" gutterBottom>
//         Employee Details Form
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               select
//               label="Title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               fullWidth
//             >
//               <MenuItem value="">Select</MenuItem>
//               <MenuItem value="Mr">Mr</MenuItem>
//               <MenuItem value="Mrs">Mrs</MenuItem>
//               <MenuItem value="Ms">Ms</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="First Name"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Last Name"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Designation"
//               name="designation"
//               value={formData.designation}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Department"
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Start Date"
//               name="startDate"
//               type="date"
//               value={formData.startDate}
//               onChange={handleChange}
//               fullWidth
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="End Date"
//               name="endDate"
//               type="date"
//               value={formData.endDate}
//               onChange={handleChange}
//               fullWidth
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               required
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               Save & Generate PDF
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Container>
//   );
// };

// export default Form;
