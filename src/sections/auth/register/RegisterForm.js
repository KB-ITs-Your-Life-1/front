import * as Yup from 'yup';
import React, { useState, Component } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// 라디오 버튼 
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// // --- Material Ui Imports --- //
// import { Typography, Container, Button, Box } from '@material-ui/core';
// --- Material Ui Picker Imports --- //
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
// component
import Iconify from '../../../components/Iconify';
import MemberService from '../../../service/MemberService';
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    Id : Yup.string().min(5, 'Too Short!').max(20, 'Too Long!').required('name required'),
    Name: Yup.string().min(3, 'Too Short!').max(20, 'Too Long!').required('name required'),
    birth: Yup.date(),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Too Short!').required('Password is required'),
  });
  const [values, setValues] = useState({ Id:"", Name: "", email: "" ,  password: '', sex:''});

  const formik = useFormik({
    initialValues: {
      Id: '',
      Name: '',
      email: '',
      password: '',
      sex: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard/app', { replace: true });
      console.log('성별 뭐야 ? ',formik.values.sex);
      MemberService.register(formik.values.Id,formik.values.email, formik.values.password, formik.values.Name, new Date("1999-11-06")
      , "010-0000-0000", 'X'
      );
      
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  /*
  const handleChange = (event) => {
    setValues(event.target.value);
  };
  */
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}> */}
            <TextField
              fullWidth
              label="name"
              value={formik.values.Name}
              {...getFieldProps('Name')}
              error={Boolean(touched.Name && errors.Name)}
              helperText={touched.Name && errors.Name}
            />

            <TextField
              fullWidth
              label="id"
              value={formik.values.Id}
              {...getFieldProps('Id')}
              error={Boolean(touched.Id && errors.Id)}
              helperText={touched.Id && errors.Id}
            />

            {/* <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack> */}

          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <KeyboardDatePicker
              label="Material Date Picker"
              value={selectedDate}
              onChange={handleDateChange}
            />

          </MuiPickersUtilsProvider> */}


          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            value={formik.values.email}
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            
            value={formik.values.password}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          {/*
              <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="sex" name="gender1" 
              value={formik.values.sex}
              {...getFieldProps('sex')} 
              onChange={handleChange}>
                <FormControlLabel value="X" control={<Radio />} label="Female" />
                <FormControlLabel value="Y" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
          */}
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}