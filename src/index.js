import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./style.css";
import TextInput from "./TextInput";

/**
 * Get the number of days in any particular month
 * @link https://stackoverflow.com/a/1433119/1293256
 * @param  {Number} m The month (valid: 0-11)
 * @param  {Number} y The year
 * @return {Number}   The number of days in the month
 */
const daysInMonth = (m, y) => {
  switch (m) {
    case 1:
      return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
    case 8:
    case 3:
    case 5:
    case 10:
      return 30;
    default:
      return 31;
  }
};

/**
 * Check if a date is valid
 * @link https://stackoverflow.com/a/1433119/1293256
 * @param  {Number}  d The day
 * @param  {Number}  m The month
 * @param  {Number}  y The year
 * @return {Boolean}   Returns true if valid
 */
const isAValidPartialDate = (d, m, y) => {
  m = parseInt(m, 10) - 1;
  return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
};

const isValidDate = value => {
  const dateWrapper = new Date(value);
  return !isNaN(dateWrapper.getDate());
};

const TextDatepicker = props => {
  const dateValue =
    props.value && isValidDate(props.value) ? new Date(props.value) : null;

  const dayValue = dateValue ? `${props.value.getDate()}` : "";
  const monthValue = dateValue ? `${props.value.getMonth() + 1}` : "";
  const yearValue = dateValue ? `${props.value.getFullYear()}` : "";

  const [day, setDay] = useState(dayValue);
  const [month, setMonth] = useState(monthValue);
  const [year, setYear] = useState(yearValue);

  useEffect(() => {
    if (year && year.length === 4 && month && day && props.onChange) {
      if (isAValidPartialDate(day, month, year)) {
        props.onChange(new Date(Number(year), Number(month) - 1, Number(day)));
      } else {
        props.onChange("Invalid date");
      }
    }
  });

  const Separator = () => <span className="separator">{props.separator}</span>;

  const onInputChange = evt => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case "day-input":
        setDay(value);
        break;
      case "month-input":
        setMonth(value);
        break;
      case "year-input":
        setYear(value);
        break;
    }
  };

  return (
    <span className="rtdp">
      <span className="rtdp-inner">
        <TextInput
          name="day-input"
          className="rtdp-day"
          value={day}
          hintText={props.hints ? props.dayHint : null}
          onInputChange={onInputChange}
          maxLength={2}
        />
        <Separator />
        <TextInput
          name="month-input"
          className="rtdp-month"
          value={month}
          hintText={props.hints ? props.monthHint : null}
          onInputChange={onInputChange}
          maxLength={2}
        />
        <Separator />
        <TextInput
          name="year-input"
          className="rtdp-year"
          value={year}
          hintText={props.hints ? props.yearHint : null}
          onInputChange={onInputChange}
          maxLength={4}
        />
      </span>
    </span>
  );
};

TextDatepicker.defaultProps = {
  value: null,
  separator: "/",
  hints: true,
  dayHint: "DD",
  monthHint: "MM",
  yearHint: "YYYY",
  onChange: null
};

TextDatepicker.propTypes = {
  value: PropTypes.object,
  separator: PropTypes.string,
  hints: PropTypes.bool,
  dayHint: PropTypes.string,
  monthHint: PropTypes.string,
  yearHint: PropTypes.string,
  onChange: PropTypes.func
};

export default TextDatepicker;
