import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import FormInput from 'components/FormInput';
import { logIn, setError } from 'modules/users/actions';
import { selectError } from 'modules/users/selectors';
import { useForm } from 'utils/hooks';
import { isEmail } from 'utils/validators';


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
  return errors;
};

const LogInPage = () => {

  const s = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const form = useForm(() => dispatch(logIn(values.email, values.password)), validator, {});
  const { handleSubmit, values } = form;

  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(setError(''));
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={s.paper}>
        <Avatar className={s.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={s.form} noValidate onSubmit={handleSubmit}>
          <FormInput
            isAutoFocus
            isRequired
            label="Email"
            name="email"
            {...form}
          />
          <FormInput
            isRequired
            label="Password"
            name="password"
            type="password"
            {...form}
            errors={{ ...form.errors, ...{ password: error } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={s.submit}
          >
            Log In
          </Button>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="primary"
            className={s.signUpButton}
            onClick={() => history.push('/sign-up')}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LogInPage;
