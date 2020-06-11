import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';


const useStyles = makeStyles(theme => ({
  formDropDown: {
    marginTop: 12,
    marginLeft: 0,
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  label: {
    backgroundColor: '#fff',
    padding: '0 5px',
    marginLeft: -3,
  },
  select: {
    minWidth: 150,
  },
}));

const FormDropDown = ({ className, handleChange, label, name, options, values }) => {

  const s = useStyles();

  return (
    <FormControl className={clsx(s.formDropDown, className)} margin="dense" variant="outlined">
      <InputLabel className={s.label}>
        {label}
      </InputLabel>
      <Select className={s.select} onChange={e => handleChange(name, e.target.value)} value={get(values, name, null)}>
        {options.map(option =>
          <MenuItem key={option.value + '_' + option.label} value={option.value}>{option.label}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

FormDropDown.propTypes = {
  handleChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  values: PropTypes.object,
};

export default FormDropDown;
