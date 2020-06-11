import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setError, signUp } from 'modules/users/actions';
import { selectError } from 'modules/users/selectors';
import { useForm } from 'utils/hooks';
import { isEmail, isURL } from 'utils/validators';

import FormDropDown from '../FormDropDown';
import FormInput from '../FormInput';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(1),
  },
  signUpButton: {
    marginTop: theme.spacing(1),
  },
}));

const validator = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isEmail(values.email)) {
    errors.email = 'Email is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (values.role === 'customer') {
    if (!values.firstName) {
      errors.firstName = 'First Name is required';
    }
    if (!values.lastName) {
      errors.lastName = 'Last Name is required';
    }
  } else {
    if (!values.name) {
      errors.name = 'Brand Name is required';
    }
    if (!values.symbol) {
      errors.symbol = 'Brand Symbol is required';
    }
    if (!values.logo) {
      errors.logo = 'Brand Logo URL is required';
    } else if (!isURL(values.logo)) {
      errors.logo = 'Brand Logo URL is not valid (ex: http://pic.com/pic)';
    }
    if (values.points <= 0) {
      errors.points = 'Loyalty Points Count should be a number greater than 0';
    }
  }
  return errors;
};

const SignUpPage = () => {

  const s = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const form = useForm(() => dispatch(signUp(values)), validator, { role: 'customer' });
  const { handleSubmit, values } = form;

  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(setError(''));
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={s.paper}>
        <Avatar className={s.avatar}>
          {values.role === 'customer' ?
            <PersonOutlineOutlinedIcon /> :
            <WorkOutlineOutlinedIcon />
          }
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={s.form} noValidate onSubmit={handleSubmit}>
          <FormDropDown
            label="Role"
            name="role"
            options={[
              { value: 'customer', label: 'Customer' },
              { value: 'brand', label: 'Brand' }
            ]}
            {...form}
          />
          <FormInput
            autoComplete={false}
            isRequired
            label="Email"
            name="email"
            {...form}
            errors={{ ...form.errors, ...{ email: error } }}
          />
          <FormInput
            autoComplete={false}
            isRequired
            label="Password"
            name="password"
            type="password"
            {...form}
          />
          {values.role === 'customer' ?
            <>
              <FormInput
                isAutoFocus
                isRequired
                label="First Name"
                name="firstName"
                {...form}
              />
              <FormInput
                label="Last Name"
                name="lastName"
                {...form}
              />
            </> :
            <>
              <FormInput
                isAutoFocus
                isRequired
                label="Brand Name"
                name="name"
                {...form}
              />
              <FormInput
                isRequired
                label="Brand Symbol"
                name="symbol"
                {...form}
              />
              <FormInput
                isRequired
                label="Brand Logo URL"
                name="logo"
                {...form}
              />
              <FormInput
                isRequired
                label="Loyalty Points Count"
                name="points"
                type="number"
                {...form}
              />
            </>
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={s.submit}
          >
            Sign Up
          </Button>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="primary"
            className={s.signUpButton}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignUpPage;
