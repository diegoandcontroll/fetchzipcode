import React from 'react';
import ReactInputDateMask from 'react-input-date-mask';

function DateInput(props) {
    return <ReactInputDateMask  mask='dd/mm/yyyy' showMaskOnFocus={true}  className={props.className} value={props.value} onChange={props.onChange} showMaskOnHover={true} />;
}
export default DateInput;