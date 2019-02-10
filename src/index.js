import React, { Component } from "react";
import PropTypes from "prop-types";

import "./style.css";

const isValidDate = value => {
  const dateWrapper = new Date(value);
  return !isNaN(dateWrapper.getDate());
};

class ReactTextDatepicker extends Component {
  constructor(props) {
    super(props);

    this.onDayChange = this.onDayChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);

    let dayValue = null;
    let monthValue = null;
    let yearValue = null;

    if (props.value && isValidDate(props.value)) {
      dayValue = props.value.getDate();
      monthValue = props.value.getMonth() + 1;
      yearValue = props.value.getFullYear();
    }

    this.state = {
      dayValue: dayValue,
      monthValue: monthValue,
      yearValue: yearValue,
      value: props.value
    };
  }

  onDayChange(evt) {
    const day = evt.target.value;
    this.setState(() => {
      return { dayValue: day };
    });
  }

  onMonthChange(evt) {
    const month = evt.target.value;
    this.setState(() => {
      return { monthValue: month };
    });
  }

  onYearChange(evt) {
    const year = evt.target.value;
    this.setState(() => {
      return { yearValue: year };
    });
  }

  render() {
    const Fragment = React.Fragment;

    const DayInput = () => (
      <input
        type="text"
        className="rtdp-input rtdp-day"
        placeholder={this.props.hints ? this.props.dayHint : null}
        value={this.state.dayValue}
        onChange={this.onDayChange}
      />
    );
    const MonthInput = () => (
      <input
        type="text"
        className="rtdp-input rtdp-month"
        placeholder={this.props.hints ? this.props.monthHint : null}
        value={this.state.monthValue}
        onChange={this.onMonthChange}
      />
    );

    const YearInput = () => (
      <input
        type="text"
        className="rtdp-input rtdp-year"
        placeholder={this.props.hints ? this.props.yearHint : null}
        value={this.state.yearValue}
        onChange={this.onYearChange}
      />
    );

    const Separator = () => (
      <span className="separator">{this.props.separator}</span>
    );

    const orderedInputs = {
      DMY: (
        <Fragment>
          <DayInput />
          <Separator />
          <MonthInput />
          <Separator />
          <YearInput />
        </Fragment>
      ),
      DYM: (
        <Fragment>
          <DayInput />
          <Separator />
          <YearInput />
          <Separator />
          <MonthInput />
        </Fragment>
      ),
      MDY: (
        <Fragment>
          <MonthInput />
          <Separator />
          <DayInput />
          <Separator />
          <YearInput />
        </Fragment>
      ),
      MYD: (
        <Fragment>
          <MonthInput />
          <Separator />
          <YearInput />
          <Separator />
          <DayInput />
        </Fragment>
      ),
      YDM: (
        <Fragment>
          <YearInput />
          <Separator />
          <DayInput />
          <Separator />
          <MonthInput />
        </Fragment>
      ),
      YMD: (
        <Fragment>
          <YearInput />
          <Separator />
          <MonthInput />
          <Separator />
          <DayInput />
        </Fragment>
      )
    };

    let fieldOrder = this.props.fieldOrder;
    if (Object.keys(orderedInputs).indexOf(fieldOrder) === -1) {
      console.warn(
        "Field order is invalid. Please check fieldOrder attribute in your react-text-datepicker component"
      );
      fieldOrder = "DMY";
    }

    const OrderedInput = () => orderedInputs[fieldOrder];

    return (
      <span className="rtdp">
        <span className="rtdp-inner">
          <OrderedInput />
        </span>
      </span>
    );
  }
}

ReactTextDatepicker.defaultProps = {
  value: null,
  separator: "/",
  hints: true,
  dayHint: "DD",
  monthHint: "MM",
  yearHint: "YYYY",
  fieldOrder: "DMY",
  onChange: null
};

ReactTextDatepicker.propTypes = {
  value: PropTypes.object,
  separator: PropTypes.string,
  hints: PropTypes.bool,
  dayHint: PropTypes.string,
  monthHint: PropTypes.string,
  yearHint: PropTypes.string,
  fieldOrder: PropTypes.string,
  onChange: PropTypes.func
};

export default ReactTextDatepicker;
