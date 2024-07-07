import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

const changeHandler = (e, props) => {
  let value = null;
  if (e) value = e.value;
  props.onChangeFunc(value, props.name, e);

  if (!props.onDropdownValidateFunc) return;

  let msg = null;
  if (!value && props.isReq) {
    msg = `Please select ${props.title}.`;
  }

  props.onDropdownValidateFunc(msg, props.name);
};

const Select = (props) => {
  const inputProps = {
    name: props.name,
    placeholder: props.placeholder || `Select ${props.title}`,
    className: props.className,
    isClearable: props.isClearable,
    value: props.options.find((x) => x.value === props.value),
    options: props.options,
  };

  return (
    <div className={props.outerClassName}>
      <label className="form-label">{props.title}</label>
      <ReactSelect {...inputProps} onChange={(e) => changeHandler(e, props)} />
      {props.dropdownErrorMsg && (
        <span className="text-danger">
          {props.dropdownErrorMsg === true
            ? `Please select ${props.title}.`
            : props.dropdownErrorMsg}
        </span>
      )}
    </div>
  );
};

Select.defaultProps = {
  name: '',
  title: '',
  placeholder: '',
  className: '',
  outerClassName: 'mb-2',
  isClearable: true,
  value: '',
  options: [],
  onChangeFunc: () => {},
  isReq: null,
  onDropdownValidateFunc: () => {},
};

Select.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  outerClassName: PropTypes.string,
  isClearable: PropTypes.bool,
  value: PropTypes.any,
  options: PropTypes.array,
  onChangeFunc: PropTypes.func,
  isReq: PropTypes.bool,
  dropdownErrorMsg: PropTypes.any,
  onDropdownValidateFunc: PropTypes.func,
};

export default memo(Select);
