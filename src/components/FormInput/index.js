import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';


const useStyles = makeStyles(theme => ({
  formInput: {
    minWidth: 250,
  },
}));

const FormInput = ({
  errors,
  handleChange,
  inputType,
  isAutoFocus,
  isDisabled,
  isMultiline,
  isRequired,
  label,
  name,
  type,
  values,
}) => {

  const s = useStyles();

  return (
    <TextField
      autoFocus={isAutoFocus}
      className={s.formInput}
      disabled={isDisabled}
      error={!!get(errors, name)}
      fullWidth
      helperText={get(errors, name)}
      label={label}
      margin="dense"
      multiline={isMultiline}
      name={name}
      onChange={e => handleChange(name, inputType === 'number' ? +e.target.value : e.target.value)}
      required={isRequired}
      type={type || 'text'}
      value={get(values, name) || ''}
      variant="outlined"
    />
  );
};

FormInput.propTypes = {
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  inputType: PropTypes.string,
  isAutoFocus: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isMultiline: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  values: PropTypes.object,
};

export default FormInput;
