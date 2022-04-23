import React from 'react';
import ReactDatetime from 'react-datetime';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

const DatePickerField = (props) => {
  const { form, field, placeholder, className, timeFormat = false, dateFormatInput = 'DD/MM/YYYY' } = props;
  const { name, value } = field;
  const { errors, touched } = form;
  return (
    <>
      <InputGroup className={'input-group-alternative ' + className}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ni ni-calendar-grid-58" />
          </InputGroupText>
        </InputGroupAddon>
        <ReactDatetime
          inputProps={{
            placeholder: placeholder,
            value: value._isAMomentObject ? value.format(dateFormatInput) : value,
          }}
          timeFormat={timeFormat}
          {...props}
          // initialValue={value}
          value={value}
          onChange={(val) => {
            // eslint-disable-next-line valid-typeof
            form.setFieldValue(name, val);
          }}
          closeOnClickOutside={true}
        />
      </InputGroup>
      {errors[name] && touched[name] && <div className="validate-text-field">{errors[name]}</div>}
    </>
  );
};

DatePickerField.defaultProps = {
  type: 'text',
  tabIndex: '0',
  invalid: 'false',
};

export default DatePickerField;
