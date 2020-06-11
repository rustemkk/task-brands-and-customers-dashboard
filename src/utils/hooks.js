import { set } from 'lodash';
import { useEffect, useState } from 'react';

export const useForm = (callback, validator, initialValues = {}) => {
  const [values, setValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    Object.keys(errors).length === 0 && isSubmitting && callback();
  }, [errors]); // eslint-disable-line

  const handleSubmit = (event) => {
    event && event.preventDefault();
    setErrors(validator ? validator(values) : {});
    setIsSubmitting(true);
  };

  const handleChange = (name, value) => {
    setValues(values => ({ ...set(values, name, value) }));
  };

  const handleReinitialize = () => {
    setValues({ ...initialValues });
  }

  return { errors, handleChange, handleReinitialize, handleSubmit, setErrors, values };
}

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
