import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Link, Button, Paper, TextField, Typography } from '@mui/material';

function SignUp() {
  const [userPhone, setPhone] = useState('');
  const [userName, setName] = useState('');
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const navigate = useNavigate();

  const paperStyle = {
    padding: '2rem',
    margin: '100px auto',
    borderRadius: '1rem',
    boxShadow: '10px 10px 10px',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: '600',
  };

  const rowStyle = {
    display: 'flex',
    marginTop: '2rem',
  };

  const btnStyle = {
    marginTop: '2rem',
    fontSize: '1.2rem',
    fontWeight: '700',
    backgroundColor: 'blue',
    borderRadius: '0.5rem',
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/addUsers', {
        userPhone,
        userName,
        userEmail,
        userPassword,
      });

      if (response.status === 201) {
          window.alert("Success!!");
        navigate('/login');
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        window.alert('Email already exists. Please use a different email.');
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <Grid align="center" className="wrapper">
        <Paper style={paperStyle}>
          <Typography component="h1" variant="h5" style={headingStyle}>
            Signup
          </Typography>
          <form onSubmit={handleSignup}>
            <TextField
              style={rowStyle}
              sx={{ label: { fontWeight: '700', fontSize: '1.3rem' } }}
              fullWidth
              type="text"
              placeholder="Phone Number"
              label="Phone Number"
              name="phoneNumber"
              value={userPhone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              style={rowStyle}
              sx={{ label: { fontWeight: '700', fontSize: '1.3rem' } }}
              fullWidth
              label="Name"
              variant="outlined"
              type="text"
              placeholder="Enter Name"
              name="name"
              value={userName}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              style={rowStyle}
              sx={{ label: { fontWeight: '700', fontSize: '1.3rem' } }}
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              placeholder="Enter Email"
              name="email"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              style={rowStyle}
              sx={{ label: { fontWeight: '700', fontSize: '1.3rem' } }}
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button style={btnStyle} variant="contained" type="submit" >
              SignUp
            </Button>
          </form>
          <p>Already have an account? <Link href="/login">Login</Link></p>
        </Paper>
      </Grid>
    </div>
  );
}

export default SignUp;