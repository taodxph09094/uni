import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import React from 'react';

const SelectboxField = (props) => {
  const { form, field, placeholder, type, label, disabled, onChangeCustomize, onKeyDown, className, data } = props;
  const { name, value } = field;
  const { errors, touched } = form;

  return (
    <>
      {label && <label htmlFor={name} dangerouslySetInnerHTML={{ __html: label }} />}
      <Select2
        className={'col-sm-12 form-control' + className}
        data={data}
        onChange={onChangeCustomize || field.onChange}
        type={type}
        id={name}
        value={value}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        disabled={disabled}
        options={{
          placeholder: placeholder,
        }}
        {...field}
      />
      {errors[name] && touched[name] && <div className="validate-text-field">{errors[name]}</div>}
    </>
  );
};

SelectboxField.defaultProps = {
  type: 'selectbox',
  tabIndex: '0',
  invalid: 'false',
};

export default SelectboxField;
