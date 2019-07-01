import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
//classnames takes 2 params. first is the default classes. the second param's classname is set upon meeting certain condition

const TextInputGroup = ({
  label,
  name, 
  value,
  placeholder,
  type,
  onChange,
  error

}) => {
  //The info in div with className 'invalid-feedback' is shown only when there is a class with className 'is-invalid'
  return(
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input 
        name={name}
        type={type}
        className={
          classnames('form-control form-control-lg', {
            'is-invalid': error
          })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <div className="invalid-feedback">{label} is required</div>
  </div>
  );

};

//define what props should be passed to this component
TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
}

//if type prop is not passed, set it to default value
TextInputGroup.defaultProps = {
  type: 'text'
}

export default TextInputGroup;